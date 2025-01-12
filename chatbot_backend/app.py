from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from groclake.modellake import ModelLake
from flask_cors import CORS

# Enable CORS for the Flask app



# Load environment variables from .env file
load_dotenv()

# Retrieve the variables
api_key = os.getenv('GROCLAKE_API_KEY')
account_id = os.getenv('GROCLAKE_ACCOUNT_ID')

# Initialize ModelLake instance
modellake = ModelLake()

app = Flask(__name__)

# Route to handle chatbot requests
@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # Initialize conversation history with a system message
    messages = [{"role": "system", "content": "You are a helpful assistant."}]

    # Add user message to conversation history
    messages.append({"role": "user", "content": user_input})

    # Prepare the chat completion request
    chat_completion_request = {
        "groc_account_id": account_id,
        "messages": messages
    }

    try:
        # Get the response from Modellake
        response = modellake.chat_complete(chat_completion_request)
        bot_reply = response.get('answer', "")

        if not bot_reply:
            bot_reply = "I'm sorry, I couldn't understand that. Please try again."

        # Return the bot's reply
        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

CORS(app)