import { useMemo, useState } from 'react';

const QUICK_REPLIES = [
  'Quiero automatizar un restaurante',
  'Necesito agenda para clinica',
  'Busco reservas para gimnasio',
  'Quiero una demo para mi negocio',
];

const firstBotMessage = {
  role: 'bot',
  text: 'Hola, soy Elexia Bot. Te ayudo a visualizar como automatizamos reservas con IA.'
};

function getBotReply(userText) {
  const normalized = userText.toLowerCase();

  if (normalized.includes('restaurante')) {
    return 'Para restaurantes automatizamos reservas de mesas, recordatorios y reasignacion de turnos.';
  }
  if (normalized.includes('clinica')) {
    return 'Para clinicas gestionamos citas, recordatorios y reprogramaciones con confirmacion inmediata.';
  }
  if (normalized.includes('gimnasio')) {
    return 'Para gimnasios automatizamos clases, cupos y renovaciones con notificaciones inteligentes.';
  }
  if (normalized.includes('demo')) {
    return 'Podemos montar una demo en 48 horas con tu marca y tus reglas de negocio.';
  }

  return 'Perfecto. Elexia conecta WhatsApp, web y voz para convertir consultas en reservas confirmadas.';
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([firstBotMessage]);

  const headerStatus = useMemo(() => (isOpen ? 'En linea' : 'Disponible'), [isOpen]);

  const pushConversation = (userText) => {
    const botReply = getBotReply(userText);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userText },
      { role: 'bot', text: botReply },
    ]);
  };

  const submitInput = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    pushConversation(trimmed);
    setInput('');
  };

  return (
    <>
      <button className="chatbot-fab" type="button" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? 'Cerrar' : 'Chat demo'}
      </button>

      {isOpen && (
        <section className="chatbot-panel">
          <header className="chatbot-header">
            <p className="chatbot-title mb-0">Elexia Bot</p>
            <p className="chatbot-status mb-0">{headerStatus}</p>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`chatbot-message ${message.role === 'user' ? 'chatbot-message--user' : ''}`}>
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map((item) => (
              <button key={item} type="button" className="btn btn-sm btn-outline-secondary" onClick={() => pushConversation(item)}>
                {item}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={submitInput}>
            <input
              className="form-control"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu pregunta"
            />
            <button className="btn btn-primary" type="submit">Enviar</button>
          </form>
        </section>
      )}
    </>
  );
}
