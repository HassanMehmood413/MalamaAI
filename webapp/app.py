from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from model import get_prediction
from together import Together
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set up Together API client
client = Together(api_key=os.getenv('TOGETHER_API_KEY'))
# Global variables
chat_history = []
prediction = None

def get_genai():
    try:
        if not any(message["role"] == "system" for message in chat_history):
            chat_history.insert(0, {
                "role": "system",
                "content": "You are a skin disease detection tool. You are very informative about each disease and you should provide some home remedies where safe; otherwise advise consulting a doctor."
            })

        print("Sending messages to API:", chat_history)
        
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages=chat_history,
            temperature=0.7,
            top_p=0.7,
            top_k=50,
            repetition_penalty=1,
            stop=["<|eot_id|>", "<|eom_id|>"]
        )
        
        if not response or not hasattr(response, 'choices'):
            raise Exception("Invalid response from API")
            
        content = response.choices[0].message.content
        chat_history.append({"role": "assistant", "content": content})
        return content
    except Exception as e:
        print(f"API Error in get_genai: {str(e)}")
        raise

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Set up the upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Check if file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/image', methods=['GET', 'POST'])
def image():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file part", 400
        file = request.files['file']
        
        if file.filename == '':
            return "No file selected", 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            # Call the prediction function
            prediction = get_prediction(file_path)  # Use the file path
            
            return jsonify({'predicted_class': prediction})
        
        return "Invalid file type", 400

    return render_template('upload.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Call the prediction function
    global prediction
    prediction = get_prediction(file_path)
    
    return jsonify({'predicted_class': prediction})

@app.route('/chat', methods=['POST', 'GET'])
def chat():
    global prediction, chat_history  # Reference global variables
    
    if request.method == 'GET':
        # Reset chat history for new conversation
        chat_history = []
        system_prompt = (
            "You are a skin disease detection tool. You are very informative about each disease and "
            "you should provide some home remedies where safe; otherwise advise consulting a doctor."
        )
        user_prompt = f"I have the following disease: {prediction}. What can you tell me about this?"

        # Add the initial prompts to the chat history
        chat_history.append({"role": "system", "content": system_prompt})
        chat_history.append({"role": "user", "content": user_prompt})

        try:
            response = get_genai()
            return jsonify({"response": response, "chat_history": chat_history})
        except Exception as e:
            print(f"Error in chat GET: {str(e)}")
            return jsonify({"error": str(e)}), 500

    elif request.method == 'POST':
        user_input = request.json.get('message', '')
        if not user_input:
            return jsonify({"error": "Message is required"}), 400

        chat_history.append({"role": "user", "content": user_input})

        try:
            response = get_genai()
            return jsonify({"response": response, "chat_history": chat_history})
        except Exception as e:
            print(f"Error in chat POST: {str(e)}")
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
