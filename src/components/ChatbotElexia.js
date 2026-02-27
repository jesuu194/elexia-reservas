import React, { useState } from 'react';

export default function ChatbotElexia() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente de IA de Elexia. ¿En qué puedo ayudarte?' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Gracias por tu mensaje. Un agente te responderá pronto.' }]);
    }, 900);
  };

  if (!open) {
    return (
      <button className="chatbot-elexia" style={{width:60,height:60,padding:0,justifyContent:'center',alignItems:'center',display:'flex'}} onClick={()=>setOpen(true)} title="Abrir chat">
        <img src="/logo192.png" alt="Chatbot Elexia" style={{width:38}} />
      </button>
    );
  }

  return (
    <div className="chatbot-elexia">
      <div className="chatbot-elexia-header">
        <img src="/logo192.png" alt="Elexia" style={{height:28,marginRight:8}} />
        Elexia | Chatbot de IA
        <button onClick={()=>setOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'#fff',fontSize:'1.2rem',cursor:'pointer'}} title="Cerrar">×</button>
      </div>
      <div className="chatbot-elexia-body" style={{maxHeight:180,overflowY:'auto'}}>
        {messages.map((msg,i)=>(
          <div key={i} style={{marginBottom:8,textAlign:msg.from==='bot'?'left':'right'}}>
            <span style={{background:msg.from==='bot'?'#f7f6f3':'#e0f7fa',color:'#222',borderRadius:12,padding:'6px 12px',display:'inline-block'}}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chatbot-elexia-input">
        <input type="text" placeholder="Escribe tu mensaje..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
