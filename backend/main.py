from fastapi import FastAPI, HTTPException
from routers import notes

app = FastAPI()

app.include_router(notes.router)
