from langgraph.graph import StateGraph, START, END
from openai import OpenAI
from dotenv import load_dotenv
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
import os

# Load environment variables
load_dotenv()

# Initialize Gemini API client
gemini_client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Define the LangGraph state
class RoadmapState(TypedDict):
    user_id: str
    user_query: str | None
    llm_response: str | None
    messages: Annotated[list, add_messages]

# LangGraph node function
def roadmap_generator_workflow(state: RoadmapState):
    query = state["user_query"]

    SYSTEM_PROMPT = """
    You are a career roadmap generator AI specialized in Tech and IT. Based on the user's goal, generate a step-by-step learning roadmap including stages, tools, skills, estimated time per stage, and useful resources.

    Few-shot Examples:
    - Goal: Become a Frontend Developer
    - Roadmap:
      1. Learn HTML/CSS/JS (1 month)
      2. Master React (1 month)
      3. Learn Git, GitHub (1 week)
      4. Build 3-4 projects
      5. Start applying or freelancing

    Output Format: Use headings, bullet points, and sections like Beginner, Intermediate, Advanced.
    """

    if not query:
        return state

    response = gemini_client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ],
        temperature=0.7
    )

    return {
        "user_id": state["user_id"],
        "user_query": query,
        "llm_response": response.choices[0].message.content,
        "messages": state["messages"] + [
            {"role": "user", "content": query},
            {"role": "assistant", "content": response.choices[0].message.content}
        ]
    }

# Build LangGraph
graphBuilder = StateGraph(RoadmapState)
graphBuilder.add_node("roadmap_generator", roadmap_generator_workflow)
graphBuilder.add_edge(START, "roadmap_generator")
graphBuilder.add_edge("roadmap_generator", END)

# Export for Flask
roadmap_graph = graphBuilder.compile()

# ✅ CLI Entry Point
if __name__ == "__main__":
    user_id = input("Enter user_id: ")
    query = input("Enter your career goal (e.g., Become a Data Scientist): ")

    state = {
        "user_id": user_id,
        "user_query": query,
        "llm_response": None,
        "messages": []
    }

    result = roadmap_graph.invoke(state)

    print("\n📘 AI-Generated Roadmap:")
    print(result["llm_response"])
