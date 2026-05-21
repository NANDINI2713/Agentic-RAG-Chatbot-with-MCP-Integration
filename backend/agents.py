from langgraph.graph import StateGraph, END
from typing import TypedDict
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class AgentState(TypedDict):
    query: str
    context: list[str]
    answer: str
    agent_used: str
    sources: list[str]

def route_query(state: AgentState) -> AgentState:
    q = state["query"].lower()
    if any(w in q for w in ["code", "implement", "script"]):
        state["agent_used"] = "code_agent"
    elif any(w in q for w in ["summarize", "tldr", "brief"]):
        state["agent_used"] = "summary_agent"
    elif any(w in q for w in ["compare", "difference", "vs"]):
        state["agent_used"] = "comparison_agent"
    else:
        state["agent_used"] = "general_agent"
    return state

def fetch_context(state: AgentState) -> AgentState:
    from rag import retrieve_and_rerank
    docs, sources = retrieve_and_rerank(state["query"])
    state["context"] = docs
    state["sources"] = sources
    return state

def generate_answer(state: AgentState) -> AgentState:
    context_str = "\n".join(state["context"]) if state["context"] else "No context available."
    prompt = (
        f"Context:\n{context_str}\n\n"
        f"Question: {state['query']}\n"
        f"Answer concisely. If no context, answer from general knowledge."
    )
    resp = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )
    state["answer"] = resp.choices[0].message.content
    return state

graph = StateGraph(AgentState)
graph.add_node("route_query", route_query)
graph.add_node("fetch_context", fetch_context)
graph.add_node("generate_answer", generate_answer)
graph.set_entry_point("route_query")
graph.add_edge("route_query", "fetch_context")
graph.add_edge("fetch_context", "generate_answer")
graph.add_edge("generate_answer", END)
pipeline = graph.compile()

async def run_agent_pipeline(query: str, session_id: str) -> dict:
    init_state: AgentState = {
        "query": query,
        "context": [],
        "answer": "",
        "agent_used": "",
        "sources": [],
    }
    result = pipeline.invoke(init_state)
    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "agent_used": result["agent_used"],
    }
