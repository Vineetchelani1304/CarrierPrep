from flask import Flask, request, jsonify
from flow.chatbot import graph
from dotenv import load_dotenv
import os
from flow.coverletterGenerator import cover_letter_graph
from flask import Flask, request, jsonify
from flow.AIResumeAnalyzer import langgraph_app, langgraph_app2, load_resume, embed_documents, store_in_vector_db
# Load environment variables
load_dotenv()

app = Flask(__name__)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        # Get JSON body
        data = request.get_json()


        user_id = data.get("user_id")      # passed from Node.js
        user_query = data.get("message")   # user message
        history = data.get("history", [])  # optional message history

        # Basic validation
        if not user_id or not user_query:
            return jsonify({"error": "Missing required fields"}), 400

        # Define state for LangGraph (matches flow/chatbot.py)
        state = {
            "user_id": user_id,
            "user_query": user_query,
            "messages": history,
            "llm_result": None
        }

        # Invoke LangGraph and get response
        result = graph.invoke(state)

        # Return response
        return jsonify({
            "response": result["llm_result"],
            "messages": result["messages"]
        })

    except Exception as e:
        # Log and return error
        return jsonify({"error": str(e)}), 500


@app.route("/api/resume/analyze", methods=["POST"])
def analyze_resume():
    try:
        # user_id and resume sent via Node.js
        user_id = request.form.get("user_id") or request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        if 'resume' not in request.files:
            return jsonify({"error": "Missing resume file"}), 400

        file = request.files['resume']
        if file.filename == '':
            return jsonify({"error": "Empty filename"}), 400

        # Save temporarily
        temp_path = os.path.join("/tmp", file.filename)
        file.save(temp_path)

        # Process resume
        split_docs = load_resume(temp_path)
        resume_text = "\n".join([doc.page_content for doc in split_docs])
        texts, embeddings, ids = embed_documents(split_docs)

        # Store in vector DB using user_id
        store_in_vector_db(texts, embeddings, ids, user_id=user_id)

        result = langgraph_app.invoke({
            "resume_text": resume_text,
            "user_id": user_id
        })

        return jsonify({"initial_analysis": result["initial_analysis"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/resume/query", methods=["POST"])
def answer_query():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        query = data.get("query")
        resume_text = data.get("resume_text")
        initial_analysis = data.get("initial_analysis")

        if not user_id or not query or not resume_text or not initial_analysis:
            return jsonify({"error": "Missing required fields"}), 400

        result = langgraph_app2.invoke({
            "user_id": user_id,
            "query": query,
            "resume_text": resume_text,
            "initial_analysis": initial_analysis
        })

        return jsonify({"answer": result["query_answer"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/cover-letter", methods=["POST"])
def generate_cover_letter():
    try:
        data = request.get_json()
        user_id = data.get("user_id")  # <-- required
        job_description = data.get("job_description")
        candidate_info = data.get("candidate_info")

        if not user_id or not job_description or not candidate_info:
            return jsonify({"error": "Missing required fields"}), 400

        state = {
            "user_id": user_id,  # <-- attach user_id to state
            "job_description": job_description,
            "candidate_info": candidate_info,
            "llm_response": None,
            "messages": []
        }

        result = cover_letter_graph.invoke(state)

        return jsonify({
            "cover_letter": result["llm_response"],
            "messages": result["messages"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

from flow.roadmapGenerator import roadmap_graph

@app.route("/api/roadmap", methods=["POST"])
def generate_roadmap():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        user_query = data.get("goal")

        if not user_id or not user_query:
            return jsonify({"error": "Missing required fields"}), 400

        state = {
            "user_id": user_id,
            "user_query": user_query,
            "llm_response": None,
            "messages": []
        }

        result = roadmap_graph.invoke(state)

        return jsonify({
            "roadmap": result["llm_response"],
            "messages": result["messages"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)