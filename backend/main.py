from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from qdrant_client import QdrantClient
import os
import random

app = FastAPI()

# --- CORS FIX (ALLOW THE BOOK TO TALK TO THE AI) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- CONFIGURATION ----------------
# PASTE YOUR KEYS HERE
GEMINI_API_KEY = "AIzaSyBngs-GTVIhoG-zOuGnB8DvYTh0QfNdYso" 
QDRANT_URL = "https://ff736f01-8120-4c66-b847-533561107d70.us-east4-0.gcp.cloud.qdrant.io"
QDRANT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.g8IGlzekIwEDdaY-oDJSLK_rLtOXzDaA_fyj__9T9mE"



# 1. Configure Gemini
# We use 'gemini-pro' because it is the most stable free model
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# 2. Configure Qdrant
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY, check_compatibility=False)

class Query(BaseModel):
    question: str
    selected_text: str = "" 

# Helper: Simulated Search (Bypasses Google Limits)
def get_mock_embedding():
    return [random.uniform(-1.0, 1.0) for _ in range(768)]

@app.post("/chat")
async def chat_endpoint(query: Query):
    print(f"Received Question: {query.question}")
    
    # 1. RETRIEVAL (Search Qdrant)
    try:
        search_result = qdrant.search(
            collection_name="physical_ai_book",
            query_vector=get_mock_embedding(), 
            limit=2 
        )
        book_context = "\n\n".join([hit.payload['text'] for hit in search_result])
        print("✅ Retrieved book context from Database.")
    except Exception as e:
        book_context = "Could not retrieve book context."
        print(f"⚠️ Search Error: {e}")

    # 2. GENERATION (Ask Gemini)
    prompt = (
        f"You are a helpful teaching assistant for a Physical AI textbook.\n"
        f"Use the following book content to answer the student's question.\n"
        f"Keep the answer short (under 3 sentences) and helpful.\n\n"
        f"BOOK CONTENT:\n{book_context[:4000]}\n\n" 
        f"STUDENT QUESTION: {query.question}"
    )

    try:
        print("🤖 Asking Gemini...")
        response = model.generate_content(prompt)
        print("✅ Gemini Answered.")
        return {"answer": response.text}
    except Exception as e:
        print(f"❌ Gemini Error: {e}")
        return {"answer": f"I am having trouble thinking right now. Error: {str(e)}"}

# To run: uvicorn main:app --reload
# ---------------- CONFIGURATION ----------------
