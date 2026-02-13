
# AgentOps AI

AgentOps AI is a platform to build, run, and monitor AI agents.

## Project Structure

- `backend/`: FastAPI backend for agent orchestration and control.
- `frontend/`: React + Vite frontend for the dashboard.

## Local Development Setup

### Prerequisites

- Python 3.11+
- Node.js 18+

### Backend Setup (No Docker)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    - Windows: `venv\Scripts\activate`
    - Mac/Linux: `source venv/bin/activate`
4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  Run the server:
    ```bash
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The API will be available at `http://localhost:8000` and docs at `http://localhost:8000/docs`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The dashboard will be available at `http://localhost:5173`.

## Features

- **Multi-Agent Orchestration**: Built with LangGraph.
- **Observability**: Execution logs and traces.
- **Control Plane**: Manage agents and workflows.
