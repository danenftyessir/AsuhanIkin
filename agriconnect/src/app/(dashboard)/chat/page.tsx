"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "investor" | "farmer";
  message: string;
  time: string;
  avatar?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: 1,
        sender: "farmer",
        message:
          "Selamat pagi! Terima kasih sudah tertarik dengan investasi cabai saya.",
        time: "08:30",
        avatar: "https://i.pravatar.cc/150?u=ahmad",
      },
      {
        id: 2,
        sender: "investor",
        message:
          "Pagi pak! Saya ingin tahu lebih detail tentang kondisi lahannya",
        time: "08:32",
      },
      {
        id: 3,
        sender: "farmer",
        message:
          "Silakan! Lahan saya sudah dipantau dengan sensor IoT selama 24/7. Kondisi tanah sangat optimal untuk cabai.",
        time: "08:35",
        avatar: "https://i.pravatar.cc/150?u=ahmad",
      },
      {
        id: 4,
        sender: "farmer",
        message:
          "Anda bisa lihat live monitoring dari aplikasi kapan saja. Ada pertanyaan lain?",
        time: "08:36",
        avatar: "https://i.pravatar.cc/150?u=ahmad",
      },
    ];

    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: messages.length + 1,
        sender: "investor",
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // simulate farmer response
      setTimeout(() => {
        const farmerResponse: ChatMessage = {
          id: messages.length + 2,
          sender: "farmer",
          message:
            "Terima kasih atas pertanyaannya! Saya akan segera membalas dengan informasi yang Anda butuhkan.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "https://i.pravatar.cc/150?u=ahmad",
        };
        setMessages((prev) => [...prev, farmerResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Chat dengan Petani</h1>
        <p className="page-subtitle">Komunikasi langsung dengan mitra petani</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <img
            src="https://i.pravatar.cc/150?u=ahmad"
            alt="Ahmad Suryadi"
            className="chat-avatar"
          />
          <div>
            <h3>Ahmad Suryadi</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              Petani Cabai • Online
            </p>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "investor" ? "sent" : ""}`}
            >
              {msg.avatar && (
                <img src={msg.avatar} alt="Avatar" className="message-avatar" />
              )}
              <div>
                <div className="message-content">{msg.message}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "2px solid var(--border-color)",
              borderRadius: "20px",
              outline: "none",
            }}
          />
          <button
            className="chat-send"
            onClick={sendMessage}
            style={{
              background: "var(--primary-green)",
              color: "white",
              border: "none",
              padding: "0.75rem",
              borderRadius: "50%",
              cursor: "pointer",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
