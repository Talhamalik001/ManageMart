from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from starlette.middleware.sessions import SessionMiddleware

from database import Base, engine
from routers import router as api_router

load_dotenv()

app = FastAPI(title="Backend App")


print("Creating tables...")
Base.metadata.create_all(bind=engine)

app.add_middleware(SessionMiddleware, secret_key="super-long-secret-key-1234567890")

frontend_url = os.getenv("FRONTEND_URL")
allowed_methods = os.getenv("ALLOWED_METHODS", "GET,POST,PUT,DELETE,PATCH,OPTIONS").split(",")
allowed_headers = os.getenv("ALLOWED_HEADERS", "Authorization,Content-Type").split(",")

app.add_middleware( 
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=allowed_methods,
    allow_headers=allowed_headers,
)

app.include_router(api_router)
