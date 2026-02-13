
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.api import agent, agents, workflows

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="AgentOps AI Backend",
    description="Control Plane for AgentOps AI",
    version="0.1.0",
    lifespan=lifespan
)


app.include_router(agent.router, prefix="/api/v1", tags=["agent"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["agents"])
app.include_router(workflows.router, prefix="/api/v1/workflows", tags=["workflows"])


origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AgentOps AI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
