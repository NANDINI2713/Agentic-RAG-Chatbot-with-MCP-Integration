import { useState, useRef, useEffect } from "react"

const API = "http://localhost:8000/api/chat"

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput]   = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => bottomRef.current?.scrollIntoView({behavior:"smooth"}), [messages])

  async function sendMessage() {
    if (!input.trim()) return
    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput(""); setLoading(true)
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
        agent: data.agent_used,
      }])
    } catch (e) {
      setMessages(prev => [...prev, { role:"assistant", content:"Error: "+e.message }])
    } finally { setLoading(false) }
  }

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"2rem 1rem",fontFamily:"sans-serif"}}>
      <h1 style={{fontSize:20,fontWeight:600,marginBottom:"1.5rem"}}>
        Agentic RAG Chatbot
      </h1>
      <div style={{minHeight:400,marginBottom:"1rem"}}>
        {messages.map((m,i) => (
          <div key={i} style={{marginBottom:12,textAlign:m.role==="user"?"right":"left"}}>
            <div style={{
              display:"inline-block", padding:"8px 14px", borderRadius:12,
              background:m.role==="user"?"#1a1a2e":"#f1f1f1",
              color:m.role==="user"?"#fff":"#111", maxWidth:"80%",
            }}>{m.content}</div>
            {m.sources?.length > 0 && (
              <div style={{fontSize:11,color:"#888",marginTop:4}}>
                Sources: {m.sources.join(", ")} · agent: {m.agent}
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{color:"#888",fontSize:13}}>thinking…</div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&sendMessage()}
          placeholder="Ask anything…"
          style={{flex:1,padding:"10px 14px",borderRadius:8,border:"1px solid #ddd",fontSize:14}}
        />
        <button onClick={sendMessage} disabled={loading}
          style={{padding:"10px 18px",borderRadius:8,background:"#1a1a2e",color:"#fff",border:"none",cursor:"pointer"}}>
          Send
        </button>
      </div>
    </div>
  )
}