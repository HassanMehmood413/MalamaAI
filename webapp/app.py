from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from model import get_prediction  # Import the prediction function
from openai import OpenAI
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)

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



# Global chat history and prediction
chat_history = []
load_dotenv()


@app.route('/chat', methods=['POST', 'GET'])
def chat():
    global prediction  # Reference the global prediction variable

    if request.method == 'GET':
        # Create an initial system prompt and user prompt
        system_prompt = (
            "You are a skin disease detection tool. You are very informative about each disease and "
            "you should provide some home remedies where safe; otherwise advise consulting a doctor."
        )
        user_prompt = f"I have the following disease: {prediction}. What can you tell me about this?"

        # Add the initial prompts to the chat history
        chat_history.append({"role": "system", "content": system_prompt})
        chat_history.append({"role": "user", "content": user_prompt})

        # Call the get_genai function
        response = get_genai()

        return jsonify({"response": response, "chat_history": chat_history})

    elif request.method == 'POST':
        # Handle user input from POST request
        user_input = request.json.get('message', '')
        if not user_input:
            return jsonify({"error": "Message is required"}), 400

        # Add the user's input to chat history
        chat_history.append({"role": "user", "content": user_input})

        # Generate AI response
        response = get_genai()

        # Return both the current response and the entire chat history
        return jsonify({"response": response, "chat_history": chat_history})

# Set up OpenAI API configuration
base_url = "https://api.aimlapi.com/v1"
api_key = os.get_env('AIML_API_KEY')
print(api_key)
system_prompt = (
    "You are a skin disease detection tool. You are very informative about each disease and "
    "you should provide some home remedies where safe; otherwise advise consulting a doctor."
)

# Create OpenAI API client
api = OpenAI(api_key=api_key, base_url=base_url)


def get_genai():
    # Ensure system prompt is the first message in the chat history
    if not any(message["role"] == "system" for message in chat_history):
        chat_history.insert(0, {"role": "system", "content": system_prompt})

    # Generate a response from the AI model
    completion = api.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2",
        messages=chat_history,
        temperature=0.7,
        max_tokens=256,
    )

    # Extract and return the AI's response
    response = completion.choices[0].message.content
    chat_history.append({"role": "assistant", "content": response})  # Add AI's response to chat history
    return response

if __name__ == '__main__':
    app.run(debug=True)
