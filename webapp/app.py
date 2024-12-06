from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from model import get_prediction  # Import the prediction function

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
    prediction = get_prediction(file_path)
    
    return jsonify({'predicted_class': prediction})

if __name__ == '__main__':
    app.run(debug=True)
