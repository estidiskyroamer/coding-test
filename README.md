# Coding Challenge: Sales Dashboard with Next.js & FastAPI

## Overview

This Sales Dashboard presents a list of sales representatives along with detailed information on each, including their deals, clients, and skills.
It also features an AI-powered text input that allows users to type in questions and receive insights based on the sales data. The AI is powered by Google Gemini.

---

## Setup

Clone this repository to your local machine.

### Backend Setup

1. Navigate to '/backend' directory.
2. Create .env file and add the following line:

   ```
   GEMINI_API_KEY=<your-api-key>
   ```

3. Create a virtual environment.

   ```bash
   python -m venv .venv
   ```

4. Activate the virtual environment.

   ```bash
   .venv\Scripts\
   ```

5. Install all required packages.

   ```bash
   pip install -r requirements.txt
   ```

6. Run the backend.

   ```bash
   python main.py
   ```

   By default, it can be accessed at [http://localhost:8000/](http://localhost:8000/).

### Frontend Setup

1. Navigate to '/frontend' directory.
2. Install all required packages.
   ```bash
   npm install
   ```
3. Run the frontend.
   By default, it can be accessed at [http://localhost:3000/](http://localhost:3000/).

---

## Design Choices

This app uses HeroUI as the UI framework. It is chosen for simplicity and compatibility with Next.js. The framework has readily available components that can be used to build UI as fast as possible.
The use of Tailwind CSS simplifies the customization of the UI design.

The design of the app uses simple card-based layout, with the sales reps data card on the top and AI feature on the bottom. The sales reps detail can be shown in a tab-based modal for a minimalistic and compact view.

The AI feature is powered by Google Gemini. It is chosen for its capability to analyze small to medium data.

## Potential Improvements

- Use of localized AI or LLM to more efficiently analyze local data.
- Enhancing frontend with the use of charts and other data visualization tools.
- Caching frequently used AI prompts.
