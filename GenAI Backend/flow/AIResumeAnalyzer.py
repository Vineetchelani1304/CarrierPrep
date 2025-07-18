# # Resume Analyzer LangGraph Workflow (with GraphBuilder)

# import os
# import uuid
# from typing import TypedDict, Optional
# from dotenv import load_dotenv
# from langgraph.graph import START, END, StateGraph
# # from langgraph.graph.graph import GraphBuilder
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# import chromadb
# from openai import OpenAI

# # Load env and configure Gemini
# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# gemini_client = OpenAI(
#     api_key=GEMINI_API_KEY,
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
# )

# # Define LangGraph state
# class State(TypedDict):
#     resume_text: str
#     query: Optional[str]
#     initial_analysis: Optional[str]
#     query_answer: Optional[str]

# # Load and preprocess resume
# def load_resume(file_path):
#     loader = PyPDFLoader(file_path)
#     docs = loader.load()
#     splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
#     return splitter.split_documents(docs)

# def embed_documents(split_docs):
#     embeddings, texts, ids = [], [], []
#     for doc in split_docs:
#         result = gemini_client.embeddings.create(
#             model="models/embedding-001", input=doc.page_content
#         )
#         embeddings.append(result.data[0].embedding)
#         texts.append(doc.page_content)
#         ids.append(str(uuid.uuid4()))
#     return texts, embeddings, ids

# # Store to Chroma
# chroma_client = chromadb.Client()
# collection = chroma_client.get_or_create_collection("resume_collection")

# def store_in_vector_db(texts, embeddings, ids):
#     collection.add(documents=texts, embeddings=embeddings, ids=ids)

# # LangGraph Nodes
# def initial_analysis_node(state: State):
#     resume_text = state["resume_text"]
#     SYSTEM_PROMPT = """
#     You are ResumeGenie — an expert AI resume reviewer.

#     Your job is to analyze resumes and generate personalized, professional improvement suggestions to help users land better job opportunities. The resume content will be provided to you as context.

#     Your output must:
#     - Be tailored to a fresh graduate or junior developer (unless senior experience is shown),
#     - Focus on structure, keywords, clarity, impact, and ATS-friendliness,
#     - Include concrete suggestions for improving each section (Projects, Experience, Skills, Education, Summary),
#     - Use bullet points for easy readability,
#     - Be honest, supportive, and never generic or vague,
#     - Mention if any important section (e.g., Summary, Achievements, Projects) is missing.

#     ### ✨ Output Format:
#     **✅ Overall Review:**  
#     (Highlight strengths and weaknesses in 2–3 lines.)

#     **📌 Section-wise Suggestions:**  
#     - **Header:**  
#     - **Summary:**  
#     - **Skills:**  
#     - **Projects:**  
#     - **Experience:**  
#     - **Education:**  
#     - **Achievements:**  

#     **🚀 Suggestions to Boost Resume for Placements:**  
#     (Add concrete advice like adding GitHub, Leetcode, Open Source, etc.)

#     Be honest, structured, and constructive. Don’t generate resumes, just suggestions.
#     """
#     res = gemini_client.chat.completions.create(
#         model="models/gemini-2.5-flash",
#         messages=[
#             {"role": "system", "content": SYSTEM_PROMPT},
#             {"role": "user", "content": resume_text}
#         ]
#     )

#     print("Initial analysis completed.")
#     # print("Initial analysis:", state["initial_analysis"])
#     return {"initial_analysis": res.choices[0].message.content}

# def answer_query_node(state: State):
#     query = state["query"]
#     query_embedding = gemini_client.embeddings.create(
#         model="models/embedding-001",
#         input=query
#     ).data[0].embedding

#     results = collection.query(query_embeddings=[query_embedding], n_results=2)
#     context = "\n".join(results["documents"][0])

#     SYSTEM_PROMPT = f"""
#     You are ResumeGenie — an expert AI resume reviewer.
#     { context}
#     Your task is to answer user queries about their resume using the provided context.
#     Use the context to provide specific, actionable answers based on the resume analysis.
#     If the context does not provide enough information, politely inform the user.
#     Always refer to the initial analysis for context.
#     """
#     res = gemini_client.chat.completions.create(
#         model="models/gemini-2.5-flash",
#         messages=[
#             {"role": "system", "content": SYSTEM_PROMPT},
#             {"role": "user", "content": query}
#         ]
#     )

#     return {
#         "query_answer": res.choices[0].message.content,
#     }

# # Define LangGraph using GraphBuilder
# builder1 = StateGraph(State)
# builder2 = StateGraph(State)
# builder1.add_node("InitialAnalysis", initial_analysis_node)
# builder2.add_node("AnswerQuery", answer_query_node)

# builder1.set_entry_point("InitialAnalysis")
# builder1.add_edge(START, "InitialAnalysis")
# builder1.add_edge("InitialAnalysis", END)
# builder2.set_entry_point("AnswerQuery")
# builder2.add_edge(START, "AnswerQuery")
# builder2.add_edge("AnswerQuery", END)
# langgraph_app = builder1.compile()
# langgraph_app2 = builder2.compile()

# # Run Graph
# if __name__ == "__main__":
#     split_docs = load_resume("D:/PrepCoach/GenAI Backend/My resume ats friendly.pdf")
#     resume_text = "\n".join([doc.page_content for doc in split_docs])
#     texts, embeddings, ids = embed_documents(split_docs)
#     store_in_vector_db(texts, embeddings, ids)

#     # Step 1: Initial analysis
#     init_result = langgraph_app.invoke({"resume_text": resume_text})
#     print("\n📄 Resume Review:\n")
#     print(init_result["initial_analysis"])

#     # Step 2: User query
#     query = input("\nAsk a question about your resume: ")
#     query_result = langgraph_app2.invoke({
#         "resume_text": resume_text,
#         "query": query,
#         "initial_analysis": init_result["initial_analysis"]  # ✅ preserved
#     })
#     print("\n🧠 Answer to your question:\n")
#     print(query_result["query_answer"])





import os
import uuid
from typing import TypedDict, Optional
from dotenv import load_dotenv
from langgraph.graph import START, END, StateGraph
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from openai import OpenAI

# Load env and configure Gemini
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

gemini_client = OpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Define LangGraph state
class State(TypedDict):
    resume_text: str
    query: Optional[str]
    initial_analysis: Optional[str]
    query_answer: Optional[str]
    user_id: Optional[str]  # Include user_id

# Load and preprocess resume

def load_resume(file_path):
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    return splitter.split_documents(docs)

def embed_documents(split_docs):
    embeddings, texts, ids = [], [], []
    for doc in split_docs:
        result = gemini_client.embeddings.create(
            model="models/embedding-001", input=doc.page_content
        )
        embeddings.append(result.data[0].embedding)
        texts.append(doc.page_content)
        ids.append(str(uuid.uuid4()))
    return texts, embeddings, ids

# Store to Chroma (with user-specific collections)
chroma_client = chromadb.HttpClient(host="localhost", port=8000)

def get_user_collection(user_id: str):
    return chroma_client.get_or_create_collection(f"resume_collection_{user_id}")

def store_in_vector_db(texts, embeddings, ids, user_id):
    chroma_client = chromadb.HttpClient(host='localhost', port=8000)
    collection_name = f"resume_collection_{user_id}"
    collection = chroma_client.get_or_create_collection(name=collection_name)

    collection.add(
        documents=texts,
        embeddings=embeddings,
        ids=ids
    )


# LangGraph Nodes
def initial_analysis_node(state: State):
    resume_text = state["resume_text"]
    SYSTEM_PROMPT = """
    You are ResumeGenie — an expert AI resume reviewer.

    Your job is to analyze resumes and generate personalized, professional improvement suggestions to help users land better job opportunities. The resume content will be provided to you as context.

    Your output must:
    - Be tailored to a fresh graduate or junior developer (unless senior experience is shown),
    - Focus on structure, keywords, clarity, impact, and ATS-friendliness,
    - Include concrete suggestions for improving each section (Projects, Experience, Skills, Education, Summary),
    - Use bullet points for easy readability,
    - Be honest, supportive, and never generic or vague,
    - Mention if any important section (e.g., Summary, Achievements, Projects) is missing.

    ### ✨ Output Format:
    **✅ Overall Review:**  
    (Highlight strengths and weaknesses in 2–3 lines.)

    **📌 Section-wise Suggestions:**  
    - **Header:**  
    - **Summary:**  
    - **Skills:**  
    - **Projects:**  
    - **Experience:**  
    - **Education:**  
    - **Achievements:**  

    **🚀 Suggestions to Boost Resume for Placements:**  
    (Add concrete advice like adding GitHub, Leetcode, Open Source, etc.)

    Be honest, structured, and constructive. Don’t generate resumes, just suggestions.
    """
    res = gemini_client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": resume_text}
        ]
    )

    print("Initial analysis completed.")
    return {"initial_analysis": res.choices[0].message.content}

def answer_query_node(state: State):
    query = state["query"]
    user_id = state["user_id"]
    query_embedding = gemini_client.embeddings.create(
        model="models/embedding-001",
        input=query
    ).data[0].embedding

    collection = get_user_collection(user_id)
    results = collection.query(query_embeddings=[query_embedding], n_results=2)
    context = "\n".join(results["documents"][0])

    SYSTEM_PROMPT = f"""
    You are ResumeGenie — an expert AI resume reviewer.
    { context }
    Your task is to answer user queries about their resume using the provided context.
    Use the context to provide specific, actionable answers based on the resume analysis.
    If the context does not provide enough information, politely inform the user.
    Always refer to the initial analysis for context.
    """
    res = gemini_client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ]
    )

    return {
        "query_answer": res.choices[0].message.content,
    }

# Define LangGraph using GraphBuilder
builder1 = StateGraph(State)
builder2 = StateGraph(State)
builder1.add_node("InitialAnalysis", initial_analysis_node)
builder2.add_node("AnswerQuery", answer_query_node)

builder1.set_entry_point("InitialAnalysis")
builder1.add_edge(START, "InitialAnalysis")
builder1.add_edge("InitialAnalysis", END)
builder2.set_entry_point("AnswerQuery")
builder2.add_edge(START, "AnswerQuery")
builder2.add_edge("AnswerQuery", END)
langgraph_app = builder1.compile()
langgraph_app2 = builder2.compile()

# Run Graph
if __name__ == "__main__":
    user_id = "user_123"  # ✅ Replace this with dynamic input or API param
    split_docs = load_resume("D:/PrepCoach/GenAI Backend/My resume ats friendly.pdf")
    resume_text = "\n".join([doc.page_content for doc in split_docs])
    texts, embeddings, ids = embed_documents(split_docs)
    store_in_vector_db(user_id, texts, embeddings, ids)

    init_result = langgraph_app.invoke({"resume_text": resume_text, "user_id": user_id})
    print("\n📄 Resume Review:\n")
    print(init_result["initial_analysis"])

    query = input("\nAsk a question about your resume: ")
    query_result = langgraph_app2.invoke({
        "resume_text": resume_text,
        "query": query,
        "initial_analysis": init_result["initial_analysis"],
        "user_id": user_id
    })
    print("\n🧠 Answer to your question:\n")
    print(query_result["query_answer"])