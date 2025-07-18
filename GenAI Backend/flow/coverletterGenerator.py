from langgraph.graph import StateGraph, START, END
from openai import OpenAI
from dotenv import load_dotenv
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
import os

# Load environment variables
load_dotenv()

# Gemini client using OpenAI wrapper
gemini_client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# System Prompt with few-shot examples
COVER_LETTER_SYSTEM_PROMPT = """
You are an AI Cover Letter Writer. Based on the job description and candidate background, generate a professional, personalized cover letter that highlights relevant experience and enthusiasm for the role.

🟩 Few-Shot Example 1

Input:
Job Description:
We’re hiring a Backend Developer skilled in Node.js and MongoDB. Must have experience with REST APIs and Docker.

Candidate:
Hi, I'm Vineet, a Computer Engineering student with backend experience in Node.js, Express, MongoDB, and Docker. I've built real-world projects like an Expense Tracker and Appointment Booking system.

Output:
Dear Hiring Manager,

I am excited to apply for the Backend Developer role at your company. With a strong foundation in Node.js, Express, and MongoDB, I’ve built scalable systems like an Expense Tracker and an Appointment Booking app. My familiarity with Docker and RESTful APIs makes me confident in deploying production-ready services.

As a Computer Engineering student, I am passionate about backend development and eager to contribute to your technical team. I would love the opportunity to discuss how I can add value to your backend systems.

Thank you for considering my application.

Sincerely,  
Vineet

🟩 Few-Shot Example 2

Input:
Job Description:
Looking for a Frontend Engineer with experience in React, Tailwind CSS, and responsive design.

Candidate:
I'm a self-taught frontend developer. I’ve built portfolio websites and dashboards using React, Tailwind, and Framer Motion. I care deeply about UI/UX and accessibility.

Output:
Dear Hiring Team,

I am thrilled to apply for the Frontend Engineer position. With hands-on experience in React and Tailwind CSS, I’ve built several responsive interfaces that emphasize accessibility and user experience. My projects, including dashboards and landing pages, reflect my attention to performance and modern design trends.

I am eager to bring this passion to your team and collaborate on visually engaging interfaces. Thank you for your time and consideration.

Sincerely,  
[Your Name]
"""

# Define the LangGraph state with user_id
class CoverLetterState(TypedDict):
    user_id: str | None
    job_description: str | None
    candidate_info: str | None
    llm_response: str | None
    messages: Annotated[list, add_messages]

# Core Node Function
def cover_letter_generator_workflow(state: CoverLetterState):
    if not state["job_description"] or not state["candidate_info"]:
        return state

    prompt = f"""
Job Description:
{state['job_description']}

Candidate:
{state['candidate_info']}
"""

    response = gemini_client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {"role": "system", "content": COVER_LETTER_SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return {
        "user_id": state["user_id"],  # maintain user_id
        "job_description": state["job_description"],
        "candidate_info": state["candidate_info"],
        "llm_response": response.choices[0].message.content,
        "messages": state["messages"] + [
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": response.choices[0].message.content}
        ]
    }

# Build LangGraph pipeline
graphBuilder = StateGraph(CoverLetterState)
graphBuilder.add_node("cover_letter_generator", cover_letter_generator_workflow)
graphBuilder.add_edge(START, "cover_letter_generator")
graphBuilder.add_edge("cover_letter_generator", END)
cover_letter_graph = graphBuilder.compile()

# CLI entrypoint
if __name__ == "__main__":
    print("📄 Cover Letter Generator\n")
    while True:
        job_desc = input("Paste job description (or type 'exit' to quit): ")
        if job_desc.lower() in ["exit", "quit"]:
            break

        candidate_info = input("Enter your background/experience: ")
        user_id = input("Enter user ID: ")

        state = {
            "user_id": user_id,
            "job_description": job_desc,
            "candidate_info": candidate_info,
            "llm_response": None,
            "messages": []
        }

        result = cover_letter_graph.invoke(state)
        print("\n📝 Generated Cover Letter:\n")
        print(result["llm_response"])
