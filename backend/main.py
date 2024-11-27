from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import csv
from io import StringIO
import openai
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fetch environment variables
SEMRUSH_API_KEY = os.getenv("SEMRUSH_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@app.get("/api/analyze-domain")
def analyze_domain(
    domain: str = Query(..., description="Enter the domain to analyze"),
):
    # SEMrush API URL
    semrush_urls = [
        f"https://api.semrush.com/?type=domain_organic_organic&display_limit=10&key={SEMRUSH_API_KEY}&domain={domain}&database=us",
        f"https://api.semrush.com/?type=domain_organic&display_limit=10&key={SEMRUSH_API_KEY}&domain={domain}&database=us&export_columns=Ph,Po,Pp,Nq,Tr",
        f"https://api.semrush.com/?type=domain_organic&display_limit=10&key={SEMRUSH_API_KEY}&domain={domain}&database=us&export_columns=Ph,Po,Nq,Cp,Ur,Tr,Tc",
        f"https://api.semrush.com/?type=domain_organic&display_limit=10&key={SEMRUSH_API_KEY}&domain={domain}&database=us&export_columns=Td",
    ]

    results = []

    for url in semrush_urls:
        try:
            # Fetch data from SEMrush
            semrush_response = requests.get(url)

            # Check for HTTP errors
            if semrush_response.status_code == 403:
                raise HTTPException(
                    status_code=403,
                    detail="Invalid SEMrush API key or access denied. Verify your key and permissions."
                )

            if semrush_response.status_code != 200:
                raise HTTPException(
                    status_code=semrush_response.status_code,
                    detail=f"Failed to fetch data from SEMrush: {semrush_response.text}"
                )
                continue
            
            # Parse the CSV response
            try:
                csv_data = semrush_response.text
                csv_reader = csv.DictReader(StringIO(csv_data), delimiter=';')
                parsed_data = [row for row in csv_reader]  # Convert CSV rows to a list of dictionaries
                # Generate OpenAI prompt
                openai_prompt = f"""
                    以下はSEMrush APIエンドポイント {url} から取得したデータです:
                    {parsed_data}
                    このデータを分析して、改善点を日本語で説明してください。
                    """
                
                # Call OpenAI API
                openai.api_key = OPENAI_API_KEY
                openai_response = openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "あなたはSEOの専門家です。"},
                        {"role": "user", "content": openai_prompt},
                    ],
                )
                
                # Extract AI insights
                ai_insight = openai_response.choices[0].message.content
            

            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to parse or process SEMrush data: {str(e)}"
                )
            
            # Return the combined response
            results.append({
                "endpoint": url,
                "semrush_data": parsed_data,
                "ai_insight": ai_insight,
            })

        except requests.exceptions.RequestException as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error during SEMrush API request: {str(e)}"
            )

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred: {str(e)}"
            )
    return results