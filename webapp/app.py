from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # TODO
    # configure landing page
    # user should press a continue button then get redirected to a different route
    
    
    return render_template('index.html')


@app.route('/image')
def image():
    #TODO
    # upload image
    # send to ml, get back a response and display it
    # something like "This image shows xyz disease"
    # show another button named "Proceed to chat" (or something else)
    # upon clicking that, should be directed to /chat and have the llm enter the chat then
    return "This is image route"

@app.route('/chat')
def chat():
    #TODO
    # get first message that should be the diagnosis
    ...

if __name__ == '__main__':
    app.run(debug=True)
