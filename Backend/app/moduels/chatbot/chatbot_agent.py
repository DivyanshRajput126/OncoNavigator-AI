import json
from duckduckgo_search import DDGS
from langchain_groq import ChatGroq
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from .config import (GROQ_API_KEY,CHROMA_PATH)
from .memory import (get_history,add_message)

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    api_key=GROQ_API_KEY
)

embedding_model = HuggingFaceEmbeddings(
    model_name=
    "BAAI/bge-base-en-v1.5"
)

vector_db = Chroma(
    persist_directory=CHROMA_PATH,
    embedding_function=embedding_model
)

retriever = (
    vector_db.as_retriever(
        search_kwargs={
            "k":5
        }
    )
)



ROUTER_PROMPT = """

    Classify the user query.

    Return ONLY:

    RAG
    SEARCH
    GENERAL


    RAG:
    - Brain tumors
    - Symptoms
    - Causes
    - Treatments
    - Medical information

    SEARCH:
    - Doctors
    - Hospitals
    - Specialists
    - Recommendations


    GENERAL:
    - Greetings
    - General conversation


    Query:
    {query}
"""


MEDICAL_GUARD_PROMPT = """
    You are a medical chatbot classifier.

    Decide if the user query is related to healthcare or medicine.

    Return ONLY:

    YES
    or
    NO


    Medical topics include:
    - Brain tumors
    - Diseases
    - Symptoms
    - Diagnosis
    - Treatments
    - Medicines
    - Doctors
    - Hospitals
    - Medical procedures
    - Human body
    - Health conditions
    
    Query:
    {query}
"""


def check_medical_query(query):
    response = llm.invoke(
        MEDICAL_GUARD_PROMPT.format(query=query)
    )

    return response.content.strip()

def route_query(query):
    response = llm.invoke(
        ROUTER_PROMPT.format(query=query)
    )

    return response.content.strip()



def rag_tool(query,session_id):

    docs = retriever.invoke(query)

    context = "\n\n".join(
        [
            doc.page_content
            for doc in docs
        ]
    )

    history = get_history(session_id)

    prompt = f"""
        You are a medical assistant.

        Conversation History:
        {history}

        Medical Context:
        {context}

        Current Question:
        {query}

        Answer clearly using the conversation context.
        """

    response = llm.invoke(prompt)

    return response.content


def search_tool(query):
    results=[]

    with DDGS() as ddgs:

        search_results = ddgs.text(
            query,
            max_results=10
        )

        for item in search_results:
            results.append({
                "title":item.get("title",""),
                "body":item.get("body",""),
                "url":item.get("href","")    
            })

    prompt=f"""
        Answer using:
        {json.dumps(results)}

        Question:
        {query}
        """

    response = llm.invoke(prompt)

    return response.content



def general_tool(query,session_id):
    history = get_history(
        session_id
    )

    prompt = f"""
        Conversation:
        {history}
        User:
        {query}
        
        Assistant:
    """

    response = llm.invoke(prompt)

    return response.content


def medical_chatbot(session_id,query):

    medical_check = check_medical_query(
        query
    )

    if medical_check != "YES":

        answer = (
            "I am a medical assistant "
            "and I can only help with "
            "health, disease, symptoms, "
            "tumors, treatments, and "
            "medical information."
        )

        add_message(
            session_id,
            "user",
            query
        )

        add_message(
            session_id,
            "assistant",
            answer
        )

        return {
            "route":"OUT_OF_SCOPE",
            "response":answer,
            "history":get_history(session_id)
        }

    # Existing router
    route = route_query(
        query
    )

    if "RAG" in route:
        answer = rag_tool(
            query,
            session_id
        )

    elif "SEARCH" in route:
        answer = search_tool(
            query
        )

    else:
        answer = general_tool(
            query,
            session_id
        )

    add_message(
        session_id,
        "user",
        query
    )

    add_message(
        session_id,
        "assistant",
        answer
    )
    
    return {
        "route":route,
        "response":answer,
        "history":get_history(session_id)
    }