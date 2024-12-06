from flask import Flask, render_template, request
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    # TODO
    # configure landing page
    # user should press a continue button then get redirected to a different route
    
    
    return render_template('index.html')


# Imge Route
@app.route('/image', methods=['GET', 'POST'])
def image():
    # Configuration
    UPLOAD_FOLDER = 'static/uploads'
    allowed_extensions = {'png', 'jpg', 'jpeg'}

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    # Ensure the upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    if request.method == 'POST':
        # Check if the file is part of the request
        if 'file' not in request.files:
            return "No file part", 400
        file = request.files['file']
        
        # Check if a file is selected
        if file.filename == '':
            return "No file selected", 400
        
        # Validate file type and save the file
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return f"File uploaded successfully! <a href='/{UPLOAD_FOLDER}/{filename}'>View file</a>"
        
        return "Invalid file type", 400

    # Render the upload form (for GET request)
    return render_template('upload.html')


# helper function for image
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions



@app.route('/chat')
def chat():
    #TODO
    # get first message that should be the diagnosis
    ...

if __name__ == '__main__':
    app.run(debug=True)
