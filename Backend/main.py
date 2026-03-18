from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routes import auth, user
from routes import google_auth
from starlette.middleware.sessions import SessionMiddleware
from routes import facebook_auth

from routes import instagram_auth

from routes import product
from database import Base, engine

from models.user import User
from models.product import Product

from models.video import Video
from routes import video

from routes import order

from routes import auth, protected

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

app.include_router(auth.router, prefix="/api/auth")
app.include_router(user.router, prefix="/api/user")
app.include_router(product.router, prefix="/api/products")

app.include_router(video.router, prefix="/api/videos")

app.include_router(google_auth.router, prefix="/api/google")
app.include_router(order.router, prefix="/api/orders")

#app.include_router(user.router, prefix="/user")

app.include_router(facebook_auth.router, prefix="/api/facebook")
app.include_router(instagram_auth.router, prefix="/api/instagram")

app.include_router(auth.router, prefix="/api/auth")
app.include_router(protected.router, prefix="/api/protected")

