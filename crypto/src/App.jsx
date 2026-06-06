import { useState } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "miClaveSecreta123";

function App() {
  const [textoPlano, setTextoPlano] = useState("");
  const [textoCifrado, setTextoCifrado] = useState("");
  const [textoDescifrado, setTextoDescifrado] = useState("");

  const cifrar = () => {
    if (!textoPlano.trim()) return;
    const cifrado = CryptoJS.AES.encrypt(textoPlano, SECRET_KEY).toString();
    setTextoCifrado(cifrado);
    setTextoDescifrado("");
  };

  const descifrar = () => {
    if (!textoCifrado) return;
    const bytes = CryptoJS.AES.decrypt(textoCifrado, SECRET_KEY);
    const original = bytes.toString(CryptoJS.enc.Utf8);
    setTextoDescifrado(original);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", fontFamily: "Arial", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🔐 Cipher & Decipher</h1>

      {/* Input de texto plano */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Texto Plano:
        </label>
        <input
          type="text"
          value={textoPlano}
          onChange={(e) => setTextoPlano(e.target.value)}
          placeholder="Escribe un texto para cifrar..."
          style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Botón cifrar */}
      <button
        onClick={cifrar}
        style={{ width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", marginBottom: "20px" }}
      >
        🔒 Cifrar Texto
      </button>

      {/* Mostrar texto cifrado */}
      <div style={{ marginBottom: "20px", padding: "14px", background: "#f1f5f9", borderRadius: "6px", minHeight: "50px" }}>
        <strong>Texto Cifrado:</strong>
        <p style={{ wordBreak: "break-all", color: "#dc2626", marginTop: "6px" }}>
          {textoCifrado || "— Aquí aparecerá el texto cifrado —"}
        </p>
      </div>

      {/* Botón descifrar */}
      <button
        onClick={descifrar}
        style={{ width: "100%", padding: "12px", background: "#16a34a", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", marginBottom: "20px" }}
      >
        🔓 Descifrar Texto
      </button>

      {/* Mostrar texto descifrado */}
      <div style={{ padding: "14px", background: "#f0fdf4", borderRadius: "6px", minHeight: "50px" }}>
        <strong>Texto Descifrado:</strong>
        <p style={{ color: "#15803d", marginTop: "6px", fontSize: "18px" }}>
          {textoDescifrado || "— Aquí aparecerá el texto original —"}
        </p>
      </div>
    </div>
  );
}

export default App;