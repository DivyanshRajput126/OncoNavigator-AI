from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from .config import (GROQ_API_KEY,CHROMA_PATH)
from .prompt import SYSTEM_PROMPT

class BrainTumorRAGAgent:
    def __init__(self):
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=
            "BAAI/bge-base-en-v1.5"
        )
        
        self.vector_db = Chroma(
            persist_directory=
            CHROMA_PATH,
            embedding_function=
            self.embedding_model
        )

        self.retriever = (
            self.vector_db.as_retriever(
                search_kwargs={
                    "k":6
                }
            )
        )

        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0,
            api_key=GROQ_API_KEY,
        )

    def get_information(self,tumor_name:str):

        docs = (
            self.retriever.invoke(
                tumor_name
            )
        )

        context = "\n\n".join(
            [
                doc.page_content
                for doc in docs
            ]
        )


        prompt = SYSTEM_PROMPT.format(
            context=context,
            question=tumor_name
        )
        
        response = self.llm.invoke(
            prompt
        )

        references = []

        for doc in docs:

            references.append(
                {
                    "source":doc.metadata.get(
                        "source",
                        "Unknown"
                    ),
                    "page":doc.metadata.get(
                        "page",
                        "Unknown"
                    )
                }
            )

        return {
            "answer":response.content,
            "references":references
        }