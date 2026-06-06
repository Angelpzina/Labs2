import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = "Eres un chef experto y amigable. Solo respondes preguntas sobre cocina, recetas e ingredientes. Si te preguntan algo fuera de cocina, redirige amablemente la conversación a temas culinarios.";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! Soy tu asistente de cocina 🍳 ¿Qué quieres cocinar hoy?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = updatedMessages
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const body = {
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: history,
        generationConfig: { maxOutputTokens: 500 }
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error Gemini:", data);
        throw new Error(data.error?.message || "Error desconocido");
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
      setMessages([...updatedMessages, { role: "assistant", text }]);

    } catch (err) {
      console.error(err);
      setMessages([...updatedMessages, { role: "assistant", text: `Error: ${err.message}` }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "700px", margin: "0 auto", fontFamily: "Arial" }}>
      <div style={{ background: "#1e40af", color: "white", padding: "16px 20px", textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>🍳 Chef AI — Asistente de Cocina</h2>
        <p style={{ margin: "4px 0 0", fontSize: "13px", opacity: 0.8 }}>Powered by Gemini 1.5 Flash</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "75%", padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? "#2563eb" : "white",
              color: msg.role === "user" ? "white" : "#1e293b",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)", fontSize: "15px", lineHeight: "1.5"
            }}>
              {msg.role === "assistant" && <span style={{ marginRight: "6px" }}>🍳</span>}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "white", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", color: "#64748b" }}>
              ✍️ Chef AI está escribiendo...
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "16px", background: "white", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Pregunta una receta, ingrediente, técnica..."
          style={{ flex: 1, padding: "12px 16px", borderRadius: "25px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ padding: "12px 20px", background: loading ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: "25px", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;