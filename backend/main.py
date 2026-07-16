from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, notes

app = FastAPI()

app.include_router(notes.router)
app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:4173","http://localhost:5173"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)