# Labs2

# 🍳 Chef AI — Asistente de Cocina con Gemini

## Descripción
Chef AI es una aplicación web desarrollada en React que implementa un chat inteligente
especializado en cocina, conectado a la API de Google Gemini 1.5 Flash.

El usuario puede hacer preguntas sobre recetas, ingredientes, técnicas culinarias
y el asistente responde de forma amigable como un chef experto.

## Tecnologías utilizadas
- **React** + **Vite** — Framework frontend
- **Google Gemini 1.5 Flash** — Modelo de IA generativa (gratuito)
- **@google/generative-ai** — SDK oficial de Google para Gemini

## Funcionalidades
- Chat en tiempo real con IA
- Historial de conversación en pantalla
- Respuestas especializadas en cocina (system prompt personalizado)
- Indicador de "escribiendo..." mientras la IA responde
- Interfaz responsive con burbujas de chat estilo WhatsApp

## ¿Cómo funciona?
1. El usuario escribe una pregunta en el input
2. El mensaje se envía al modelo Gemini 1.5 Flash via API
3. Gemini procesa el mensaje con el historial de conversación
4. La respuesta se muestra en pantalla como burbuja del asistente

## Arquitectura

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/chat-gemini

# Instalar dependencias
npm install

# Crear archivo .env con tu API Key
VITE_GEMINI_KEY=tu-api-key-aqui

# Correr en desarrollo
npm run dev
```

## Variables de entorno
| Variable | Descripción |
|----------|-------------|
| `VITE_GEMINI_KEY` | API Key de Google AI Studio |