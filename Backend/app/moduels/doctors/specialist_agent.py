import json
from duckduckgo_search import DDGS
from langchain_groq import ChatGroq
from .config import (GROQ_API_KEY)
from .prompt import (SPECIALIST_PROMPT)

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    api_key=GROQ_API_KEY
)

SPECIALIST_MAP = {
    "glioma":"Neuro Oncologist",
    "glioblastoma":"Neuro Oncologist",
    "astrocytoma":"Neuro Oncologist",
    "meningioma":"Neurosurgeon",
    "pituitary tumor":"Neurosurgeon",
    "pituitary":"Neurosurgeon",
    "acoustic neuroma":"Neurosurgeon"
}

def get_specialist(tumor_name):
    
    tumor_name = (
        tumor_name.lower().strip()
    )

    for key,value in SPECIALIST_MAP.items():
        if key in tumor_name:
            return value

    return "Neurologist"





def search_specialists(specialist,city,max_results=8):

    queries = [
        f"best {specialist} in {city} practo",
        f"top rated {specialist} in {city}",
        f"{specialist} {city} apollo hospital",
        f"{specialist} {city} cancer centre",
        f"{specialist} {city} hospital",
        f"{specialist} {city} neurologist directory"
    ]

    all_results=[]

    with DDGS() as ddgs:
        for query in queries:
            try:
                results = ddgs.text(
                    query,
                    max_results=max_results
                )

                all_results.extend(
                    list(results)
                )

            except Exception:
                pass

    return all_results

def specialist_agent(tumor_name,city):
    specialist = get_specialist(
        tumor_name
    )

    results = search_specialists(
        specialist,
        city
    )

    prompt = SPECIALIST_PROMPT.format(
        tumor_name=tumor_name,
        specialist=specialist,
        city=city,
        search_results=json.dumps(
            results,
            indent=2
        )
    )

    response = llm.invoke(
        prompt
    )

    return {
        "specialist":specialist,
        "answer":response.content,
        "raw_results":results
    }