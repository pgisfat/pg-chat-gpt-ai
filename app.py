from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = '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'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']

    # Define parameters for GPT-3 completion
    response = openai.Completion.create(
        engine="text-davinci-003",  # Specify the GPT-3 engine
        prompt="You are an 8th grade student with mild ADHD and autism, who knows a lot about technology. You: " + user_input,
        temperature=0.7,  # Controls the randomness of the responses
        max_tokens=150  # Controls the maximum length of the response
    )

    # Extract the generated response from the completion
    reply = response.choices[0].text.strip()
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True)
