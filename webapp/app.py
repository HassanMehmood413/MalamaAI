from flask import Flask, render_template
from model.model import AI # model/model.py - class AI 


app = Flask(__name__)

@app.route('/')
def index():
    model = AI()
    
    # here is the response variable which needs to be displayed in the chat interface
    response = model.get_response("hi")
    


if __name__ == '__main__':
    app.run(debug=True)
