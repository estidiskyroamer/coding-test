import os
from dotenv import load_dotenv      
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import uvicorn
import json

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow localhost:3000 (Next.js dev server)
origins = [
    "http://localhost:3000",
    # You can add more allowed origins like your production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all (not recommended in prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key from .env
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Load dummy data
with open("../dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

# Fetch data endpoint
@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

# Pydantic models
class AIRequest(BaseModel):
    question: str

class AIResponse(BaseModel):
    answer: str

# AI endpoint
@app.post("/api/ai", response_model=AIResponse)
async def ai_endpoint(payload: AIRequest):
    """
    Accepts a user question and returns an AI response. The AI is powered by Gemini.
    """
    user_question = payload.question

    context = f"""
    You are an assistant with access to the following sales rep data:
    
    {json.dumps(DUMMY_DATA, indent=2)}

    Based on this information, answer the user's question:
    "{user_question}"
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=context
    )
    return {"answer": response.text}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
