# src/components/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groclake.modellake import ModelLake

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Retrieve the variables
api_key = os.getenv('GROCLAKE_API_KEY')
account_id = os.getenv('GROCLAKE_ACCOUNT_ID')

# Verify they are loaded correctly
if not api_key or not account_id:
    raise ValueError("Environment variables GROCLAKE_API_KEY or GROCLAKE_ACCOUNT_ID are not set properly.")

# Set environment variables
os.environ['GROCLAKE_API_KEY'] = api_key
os.environ['GROCLAKE_ACCOUNT_ID'] = account_id

# Initialize ModelLake instance
modellake = ModelLake()

# Store conversation history
conversations = {}
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        session_id = data.get('sessionId', 'default')

        if session_id not in conversations:
            conversations[session_id] = [
                {"role": "system", "content": "You are a helpful assistant."}
            ]

        conversations[session_id].append({"role": "user", "content": message})

        chat_completion_request = {
            "groc_account_id": account_id,
            "messages": conversations[session_id]
        }

        response = modellake.chat_complete(chat_completion_request)
        bot_reply = response.get('answer', "I'm sorry, I couldn't understand that. Please try again.")

        conversations[session_id].append({"role": "assistant", "content": bot_reply})

        return jsonify({
            'status': 'success',
            'response': bot_reply
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)