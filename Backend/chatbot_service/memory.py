chat_history = {}

def get_history(session_id):
    if session_id not in chat_history:
        chat_history[session_id] = []

    return chat_history[session_id]

def add_message(session_id,role,content):

    history = get_history(
        session_id
    )

    history.append(
        {
            "role": role,
            "content": content
        }
    )

def clear_history(session_id):
    if session_id in chat_history:
        del chat_history[session_id]