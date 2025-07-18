# from mem0 import Memory
# from typing import Annotated
# from typing_extensions import TypedDict
# from langgraph.graph import StateGraph, START, END
# from langgraph.graph.message import add_messages
# from openai import OpenAI
# from dotenv import load_dotenv
# import os
# import json
# load_dotenv()



# os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")
# config = {
#     "version": "v1.1",
#     "embedder": {
#         "provider": "gemini",
#         "config": {
#             "model": "models/embedding-001",
#             "embedding_dims": 768,
#             "api_key": os.getenv("GEMINI_API_KEY"),
#         }
#     },
#     "llm": {
#         "provider": "gemini",
#         "config": {
#             "model": "gemini-2.5-flash",
#             "temperature": 0.7,
#             "max_tokens": 2000,
#             "top_p": 1.0,
#             "api_key": os.getenv("GEMINI_API_KEY")
#         }
#     },
#     "vector_store": {
#         "provider": "chroma",
#         "config": {
#             "collection_name": "career_genie_collection",
#             "path": "./chroma_db"
#         }
#     },
#     "graph_store": {
#         "provider": "neo4j",
#         "config": {
#             "url": "bolt://localhost:7687",
#             "username": "neo4j",
#             "password": "_eCDP5VXHwgbR8dE6FD1fhOfqAEJtMFnbKZqnp8yXWo"
#         },
#         "custom_prompt": "Please only extract entities containing career-related information and user Information and relationships .",
#     }
# }

# # Memory and LLM client
# memory_client = Memory.from_config(config)

# gemini_client = OpenAI(
#     api_key=os.getenv("GEMINI_API_KEY"),
#     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
# )

# class State(TypedDict):
#     messages: Annotated[list, add_messages]
#     user_query: str | None
#     llm_result: str | None

# # Chatbot node
# def chatbot(state: State):
#     query = state["user_query"]
#     if not query:
#         return state

#     # 🔍 Step 1: Retrieve relevant past memories from mem0
#     relevant_memory = memory_client.search(
#         query=query,
#         user_id="career_genie_user",
#     )
    
#     memories = [
#         f"ID : {mem.get('id')} Memory : {mem.get('memory')}" for mem in relevant_memory.get("results", [])
#     ]

#     prompt = f"""
#     you are a helpful and friendly AI assistant serving as a Career Coach. Your job is to assist users with their career-related queries by using the context and information provided.
#     if someone asks you about the resume improvement , you should tell to navigate to resume Analyser section for all the resume related queries.
#     if someone asks you about the Roadmap, you should give the roadmap in short and for detailed tell to navigate to Roadmap section for all the roadmap related queries.
#     similarly for the coverletter, you should tell to navigate to cover letter section for all the cover letter related queries.
#     memory of the user : {json.dumps(memories)}
#     """
#     # 🧠 Step 3: Combine retrieved + recent messages
#     recent_messages = state["messages"][-3:] if state["messages"] else []

#     response = gemini_client.chat.completions.create(
#         model="gemini-2.5-flash",
#         messages=[
#             {"role": "system", "content": prompt},
#             *recent_messages,  # <- short-term
#             {"role": "user", "content": query}
#         ]
#     )

#     answer = response.choices[0].message.content

#     # 💾 Step 4: Store the current interaction
#     memory_client.add(
#         [
#             {"role": "user", "content": query},
#             {"role": "assistant", "content": answer}
#         ],
#         user_id="career_genie_user"
#     )

#     return {
#         "llm_result": answer,
#         "messages": recent_messages + [
#             {"role": "user", "content": query},
#             {"role": "assistant", "content": answer}
#         ]
#     }


# # Build LangGraph
# builder = StateGraph(State)
# builder.add_node("chatbot", chatbot)
# builder.set_entry_point("chatbot")
# builder.add_edge("chatbot", END)
# graph = builder.compile()

# # CLI runner
# if __name__ == "__main__":
#     print("Welcome to CareerGenie!\n")
#     while True:
#         query = input("You: ")
#         if query.lower() in ["exit", "quit"]:
#             break

#         state = {
#             "user_query": query,
#             "messages": [],
#             "llm_result": None
#         }

#         result = graph.invoke(state)
#         print("\nCareerGenie:", result["llm_result"])



from mem0 import Memory
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import os
import json

# Load environment variables
load_dotenv()
os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY")

# Configuration
config = {
    "version": "v1.1",
    "embedder": {
        "provider": "gemini",
        "config": {
            "model": "models/embedding-001",
            "embedding_dims": 768,
            "api_key": os.getenv("GEMINI_API_KEY"),
        }
    },
    "llm": {
        "provider": "gemini",
        "config": {
            "model": "gemini-2.5-flash",
            "temperature": 0.7,
            "max_tokens": 2000,
            "top_p": 1.0,
            "api_key": os.getenv("GEMINI_API_KEY")
        }
    },
    "vector_store": {
        "provider": "chroma",
        "config": {
            "collection_name": "career_genie_collection",
            "path": "./chroma_db"
        }
    },
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": "bolt://localhost:7687",
            "username": "neo4j",
            "password": "_eCDP5VXHwgbR8dE6FD1fhOfqAEJtMFnbKZqnp8yXWo"
        },
        "custom_prompt": "Please only extract entities containing career-related information and user Information and relationships.",
    }
}

# Initialize memory and Gemini client
memory_client = Memory.from_config(config)
gemini_client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Define LangGraph state type
class State(TypedDict):
    messages: Annotated[list, add_messages]
    user_query: str | None
    llm_result: str | None
    user_id: str

# LangGraph chatbot node
def chatbot(state: State):
    query = state["user_query"]
    if not query:
        return state

    user_id = state.get("user_id")  # default fallback

    # Retrieve memory
    relevant_memory = memory_client.search(query=query, user_id=user_id)
    memories = [f"ID : {mem.get('id')} Memory : {mem.get('memory')}" for mem in relevant_memory.get("results", [])]

    prompt = f"""
    You are a helpful and friendly AI assistant serving as a Career Coach.
    Your job is to assist users with career-related queries using the provided context and user memory.
    
    - For resume questions → redirect to Resume Analyzer section.
    - For roadmap questions → give a brief, then suggest the Roadmap section.
    - For cover letter questions → redirect to Cover Letter section.

    memory of the user: {json.dumps(memories, ensure_ascii=False)}
    """

    recent_messages = state["messages"][-3:] if state["messages"] else []

    try:
        response = gemini_client.chat.completions.create(
            model="gemini-2.5-flash",
            messages=[
                {"role": "system", "content": prompt},
                *recent_messages,
                {"role": "user", "content": query}
            ]
        )

        answer = response.choices[0].message.content.strip()

    except Exception as e:
        answer = f"❌ Error fetching response from Gemini: {str(e)}"

    # Store to memory
    memory_client.add(
        [
            {"role": "user", "content": query},
            {"role": "assistant", "content": answer}
        ],
        user_id=user_id
    )

    return {
        "llm_result": answer,
        "messages": recent_messages + [
            {"role": "user", "content": query},
            {"role": "assistant", "content": answer}
        ],
        "user_id": user_id
    }

# Build LangGraph
builder = StateGraph(State)
builder.add_node("chatbot", chatbot)
builder.set_entry_point("chatbot")
builder.add_edge("chatbot", END)
graph = builder.compile()

# -------- CLI --------
if __name__ == "__main__":
    print("🟢 Welcome to CareerGenie CLI!\n")
    while True:
        query = input("You: ")
        if query.lower() in ["exit", "quit"]:
            break

        state = {
            "user_query": query,
            "messages": [],
            "llm_result": None,
            "user_id": "raju"  # change this to the logged-in user
        }

        result = graph.invoke(state)
        print("\nCareerGenie:", result["llm_result"])

