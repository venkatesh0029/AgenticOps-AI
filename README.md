# 🤖 DevGuard

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![LangGraph](https://img.shields.io/badge/LangGraph-powered-orange.svg)

**A powerful platform to build, orchestrate, and monitor AI agents with enterprise-grade observability**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Monitoring & Observability](#-monitoring--observability)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

AgenticOps-AI is a comprehensive platform designed for building, deploying, and managing AI agents at scale. Built on top of **LangGraph**, it provides a robust control plane for multi-agent orchestration with complete observability into agent execution, decision-making processes, and performance metrics.

### Why AgenticOps-AI?

- 🚀 **Production-Ready**: Enterprise-grade architecture with FastAPI backend and React frontend
- 🔄 **Multi-Agent Orchestration**: Coordinate complex workflows across multiple AI agents
- 📊 **Complete Observability**: Real-time execution logs, traces, and performance analytics
- 🎛️ **Control Plane**: Unified interface to manage agents, workflows, and configurations
- 🔌 **Extensible**: Plugin architecture for custom agents and integrations
- 📈 **Scalable**: Designed to handle enterprise workloads

---

## ✨ Features

### Core Capabilities

- **🤖 Multi-Agent System**
  - Build and deploy multiple specialized AI agents
  - Coordinate agent interactions and workflows
  - Dynamic agent selection and routing
  - Support for hierarchical agent structures

- **🔍 Observability & Monitoring**
  - Real-time execution traces
  - Detailed logging and audit trails
  - Performance metrics and analytics
  - Error tracking and debugging tools

- **🎛️ Control Plane**
  - Web-based dashboard for agent management
  - Workflow configuration and deployment
  - Agent lifecycle management
  - Configuration versioning

- **🔌 Integration Layer**
  - RESTful API for programmatic access
  - Webhook support for event-driven workflows
  - Third-party integrations
  - Custom plugin system

### Technical Features

- ⚡ **High Performance**: Built with FastAPI for async processing
- 🔒 **Secure**: Authentication and authorization ready
- 📦 **Containerized**: Docker support for easy deployment
- 🔄 **State Management**: Persistent agent state and context
- 📊 **Data Pipeline**: Structured data flow between agents
- 🧪 **Testing**: Comprehensive test coverage

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Dashboard   │  │   Workflows  │  │    Agents    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────┐
│              Backend (FastAPI + LangGraph)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Agent Engine │  │  Orchestrator│  │  Observability│  │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Storage    │  │    Queue     │  │    Cache     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- FastAPI - Modern, fast web framework
- LangGraph - Agent orchestration framework
- PostgreSQL - Primary database
- Redis - Caching and message queue
- Celery - Distributed task queue

**Frontend:**
- React 18 - UI framework
- Vite - Build tool and dev server
- TailwindCSS - Styling
- React Query - Data fetching
- Zustand - State management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.11 or higher
- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Docker** (optional, for containerized deployment)
- **PostgreSQL** (for production deployments)

---

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/venkatesh0029/AgenticOps-AI.git
cd AgenticOps-AI

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manual Setup

See [Development Setup](#-development-setup) for detailed instructions.

---

## 💻 Development Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database:**
   ```bash
   python -m app.db.init_db
   ```

6. **Run the development server:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The API will be available at:
   - API: `http://localhost:8000`
   - Interactive Docs: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The dashboard will be available at `http://localhost:5173`

### Running Tests

**Backend:**
```bash
cd backend
pytest tests/ -v
```

**Frontend:**
```bash
cd frontend
npm run test
# or
yarn test
```

---

## 📁 Project Structure

```
AgenticOps-AI/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── agents/            # Agent implementations
│   │   ├── api/               # API routes
│   │   ├── core/              # Core configuration
│   │   ├── db/                # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   └── main.py            # FastAPI application
│   ├── tests/                 # Backend tests
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Backend container
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   ├── store/             # State management
│   │   ├── utils/             # Utility functions
│   │   └── App.tsx            # Root component
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   └── Dockerfile            # Frontend container
│
├── docker-compose.yml         # Docker orchestration
├── .gitignore                # Git ignore rules
├── check_tables.py           # Database utility
├── debug_api.py              # API debugging tool
└── README.md                 # This file
```

---

## 📚 API Documentation

### Authentication

```bash
# Login to get access token
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}'
```

### Agent Management

**List all agents:**
```bash
GET /api/v1/agents
```

**Create a new agent:**
```bash
POST /api/v1/agents
Content-Type: application/json

{
  "name": "customer-service-agent",
  "type": "conversational",
  "config": {
    "model": "gpt-4",
    "temperature": 0.7
  }
}
```

**Execute an agent:**
```bash
POST /api/v1/agents/{agent_id}/execute
Content-Type: application/json

{
  "input": "How can I help you today?",
  "context": {}
}
```

### Workflow Management

**Create a workflow:**
```bash
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "customer-onboarding",
  "agents": ["agent-1", "agent-2"],
  "steps": [...]
}
```

For complete API documentation, visit `http://localhost:8000/docs` when running the server.

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Application
APP_NAME=AgenticOps-AI
DEBUG=True
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/agenticops
DATABASE_POOL_SIZE=10

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-here
API_KEY_EXPIRY_HOURS=24

# AI Models
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Observability
LOG_LEVEL=INFO
ENABLE_TRACING=True
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
VITE_ENABLE_ANALYTICS=false
```

---

## 🚢 Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

1. **Update environment variables** for production
2. **Configure reverse proxy** (nginx/caddy)
3. **Set up SSL certificates**
4. **Configure database backups**
5. **Enable monitoring and logging**

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📊 Monitoring & Observability

### Built-in Features

- **Real-time Logs**: View agent execution logs in the dashboard
- **Execution Traces**: Complete visibility into agent decision-making
- **Performance Metrics**: Track latency, throughput, and success rates
- **Error Tracking**: Automatic error detection and reporting

### Integration with External Tools

- **Prometheus**: Metrics collection endpoint at `/metrics`
- **Grafana**: Pre-built dashboards available
- **Sentry**: Error tracking integration
- **ELK Stack**: Log aggregation support

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Write clear, documented code
- Add tests for new features
- Follow existing code style
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/venkatesh0029/AgenticOps-AI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/venkatesh0029/AgenticOps-AI/discussions)
- **Email**: venkatesh0029@example.com

---

## 🙏 Acknowledgments

- Built with [LangGraph](https://github.com/langchain-ai/langgraph) for agent orchestration
- Powered by [FastAPI](https://fastapi.tiangolo.com/) and [React](https://react.dev/)
- Inspired by modern MLOps and DevOps practices

---

<div align="center">

**[⬆ Back to Top](#-agenticops-ai)**

Made with ❤️ by the AgenticOps-AI Team

</div>
