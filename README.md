# Agentic RAG Chatbot with MCP Integration

A production-ready multi-agent RAG chatbot built with LangGraph, FastAPI, and React. Routes queries across 4 specialized AI agents, retrieves context from Pinecone, reranks with Cohere, and serves answers via a clean chat UI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| LLM | Groq (LLaMA 3.1) |
| Agent Orchestration | LangGraph |
| Backend | FastAPI, Python 3.11 |
| Frontend | React, Vite |
| Vector DB | Pinecone |
| Reranking | Cohere |
| Protocol | MCP (Model Context Protocol) |
| DevOps | Docker, GitHub Actions |

## Architecture

## Project Structure

## Getting Started

### Prerequisites

- Python 3.11
- Node.js 18+
- Docker Desktop (optional)

### 1. Clone the repo

```bash
git clone https://github.com/NANDINI2713/Agentic-RAG-Chatbot-with-MCP-Integration.git
cd Agentic-RAG-Chatbot-with-MCP-Integration
```

### 2. Backend setup

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Environment variables

Create a `.env` file inside the `backend/` folder:

Get your keys:
- Groq → https://console.groq.com (free)
- Pinecone → https://app.pinecone.io
- Cohere → https://dashboard.cohere.com

### 4. Run the backend

```bash
export GROQ_API_KEY=your_groq_api_key
uvicorn main:app --reload --port 8000
```

### 5. Run the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a query, get an answer |
| GET | `/health` | Health check |

### Example

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is retrieval augmented generation?"}'
```

```json
{
  "answer": "Retrieval Augmented Generation is...",
  "sources": ["doc1.pdf"],
  "agent_used": "general_agent"
}
```

## Agent Routing

| Query keywords | Agent selected |
|----------------|---------------|
| code, implement, script | code_agent |
| summarize, tldr, brief | summary_agent |
| compare, difference, vs | comparison_agent |
| anything else | general_agent |

## Run with Docker

```bash
docker compose up --build
```

## MCP Server

```bash
python backend/mcp_server.py
```

Exposes the RAG tool to any MCP-compatible client like Claude Desktop or Cursor.

## License

MIT
