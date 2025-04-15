from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from google import genai
import uvicorn
import json

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

client = genai.Client(api_key="AIzaSyC_5QpEvTlJRxKJSa5kM0DsyFLjyTTrHOo")

# Load dummy data
with open("../dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")

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
