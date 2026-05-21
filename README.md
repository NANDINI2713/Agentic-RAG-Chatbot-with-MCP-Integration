A multi-agent RAG (Retrieval-Augmented Generation) chatbot built with LangGraph, FastAPI, and React. Routes queries across 4 specialized AI agents, retrieves context from Pinecone, and serves answers via a clean chat UI.

## Tech Stack

**Backend:** Python, FastAPI, LangGraph, Groq (LLaMA 3.1), Pinecone, Cohere  
**Frontend:** React, Vite  
**xaAgentic RAG Chatbot with MCP Integration
A production-ready multi-agent RAG chatbot built with LangGraph, FastAPI, and React. Routes queries across 4 specialized AI agents, retrieves context from Pinecone, reranks with Cohere, and serves answers via a clean chat UI.
Tech Stack
LayerTechnologyLLMGroq (LLaMA 3.1)Agent OrchestrationLangGraphBackendFastAPI, Python 3.11FrontendReact, ViteVector DBPineconeRerankingCohereProtocolMCP (Model Context Protocol)DevOpsDocker, GitHub Actions
Architecture
User → React UI → FastAPI → LangGraph Router
                                ├── code_agent
                                ├── summary_agent
                                ├── comparison_agent
                                └── general_agent
                                        ↓
                              Pinecone Retrieval
                                        ↓
                              Cohere Reranking
                                        ↓
                              Groq LLM (LLaMA 3.1)
                                        ↓
                                    Answer
Project Structure
rag-mcp-chatbot/
├── backend/
│   ├── main.py            # FastAPI app & REST endpoints
│   ├── agents.py          # LangGraph multi-agent pipeline
│   ├── rag.py             # Pinecone retrieval & Cohere reranking
│   ├── mcp_server.py      # MCP stdio server
│   └── requirements.txt
├── frontend/
│   ├── src/App.jsx        # React chat UI
│   └── package.json
├── docker-compose.yml
├── Dockerfile.backend
└── .github/workflows/
    └── deploy.yml
Getting Started
Prerequisites

Python 3.11
Node.js 18+
Docker Desktop (optional)

1. Clone the repo
bashgit clone https://github.com/NANDINI2713/Agentic-RAG-Chatbot-with-MCP-Integration.git
cd Agentic-RAG-Chatbot-with-MCP-Integration
2. Backend setup
bashcd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
3. Environment variables
Create a .env file inside the backend/ folder:
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=rag-index
COHERE_API_KEY=your_cohere_api_key
Get your keys here:

Groq → https://console.groq.com (free)
Pinecone → https://app.pinecone.io
Cohere → https://dashboard.cohere.com

4. Run the backend
bashexport GROQ_API_KEY=your_groq_api_key
uvicorn main:app --reload --port 8000
5. Run the frontend
bashcd ../frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.
API Reference
MethodEndpointDescriptionPOST/api/chatSend a query, get an answerGET/healthHealth check
Example
bashcurl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is retrieval augmented generation?"}'
json{
  "answer": "Retrieval Augmented Generation is...",
  "sources": ["doc1.pdf"],
  "agent_used": "general_agent"
}
Agent Routing
Query keywordsAgentcode, implement, scriptcode_agentsummarize, tldr, briefsummary_agentcompare, difference, vscomparison_agentanything elsegeneral_agent
Run with Docker
bashdocker compose up --build
MCP Server
bashpython backend/mcp_server.py
Exposes the RAG tool to any MCP-compatible client like Claude Desktop or Cursor.
License
MIT:** Docker, GitHub Actions CI/CD  
**Protocol:** MCP (Model Context Protocol) server for tool integration

## Architecture
