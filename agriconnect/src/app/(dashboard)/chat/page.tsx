"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  ArrowLeft,
  Paperclip,
  Camera,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: "INVESTOR" | "FARMER";
  lastSeen: Date;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "file";
}

interface ChatRoom {
  id: string;
  user: ChatUser;
  lastMessage: Message;
  unreadCount: number;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatRooms();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatRooms = () => {
    const mockChatRooms: ChatRoom[] = [
      {
        id: "1",
        user: {
          id: "farmer1",
          name: "ahmad suryadi",
          avatar: "https://i.pravatar.cc/150?u=ahmad",
          role: "FARMER",
          lastSeen: new Date(),
          online: true,
        },
        lastMessage: {
          id: "msg1",
          senderId: "farmer1",
          receiverId: "user1",
          content: "terima kasih sudah berinvestasi di lahan cabai saya",
          timestamp: new Date(Date.now() - 30 * 60000),
          read: false,
          type: "text",
        },
        unreadCount: 2,
      },
      {
        id: "2",
        user: {
          id: "farmer2",
          name: "siti rahayu",
          avatar: "https://i.pravatar.cc/150?u=siti",
          role: "FARMER",
          lastSeen: new Date(Date.now() - 2 * 60 * 60000),
          online: false,
        },
        lastMessage: {
          id: "msg2",
          senderId: "user1",
          receiverId: "farmer2",
          content: "kapan perkiraan panen jagung manisnya?",
          timestamp: new Date(Date.now() - 2 * 60 * 60000),
          read: true,
          type: "text",
        },
        unreadCount: 0,
      },
      {
        id: "3",
        user: {
          id: "investor1",
          name: "sarah investor",
          avatar: "https://i.pravatar.cc/150?u=sarah",
          role: "INVESTOR",
          lastSeen: new Date(Date.now() - 1 * 60 * 60000),
          online: false,
        },
        lastMessage: {
          id: "msg3",
          senderId: "investor1",
          receiverId: "user1",
          content: "ada rekomendasi investasi lain?",
          timestamp: new Date(Date.now() - 1 * 60 * 60000),
          read: true,
          type: "text",
        },
        unreadCount: 0,
      },
    ];

    setChatRooms(mockChatRooms);
    setSelectedChat(mockChatRooms[0]?.id || "");
    setLoading(false);
  };

  const loadMessages = (chatId: string) => {
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "farmer1",
        receiverId: "user1",
        content:
          "selamat pagi! terima kasih sudah tertarik dengan investasi cabai saya",
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "2",
        senderId: "user1",
        receiverId: "farmer1",
        content:
          "pagi pak! saya ingin tahu lebih detail tentang kondisi lahannya",
        timestamp: new Date(Date.now() - 55 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "3",
        senderId: "farmer1",
        receiverId: "user1",
        content:
          "tentu saja! lahan cabai saya terletak di boyolali dengan luas 2.5 hektar",
        timestamp: new Date(Date.now() - 50 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "4",
        senderId: "farmer1",
        receiverId: "user1",
        content:
          "sudah menggunakan sistem iot untuk monitoring suhu dan kelembaban",
        timestamp: new Date(Date.now() - 45 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "5",
        senderId: "user1",
        receiverId: "farmer1",
        content: "wah menarik! berapa perkiraan hasil panen per hektarnya?",
        timestamp: new Date(Date.now() - 40 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "6",
        senderId: "farmer1",
        receiverId: "user1",
        content:
          "dengan sistem iot dan perawatan optimal, target 8-10 ton per hektar",
        timestamp: new Date(Date.now() - 35 * 60000),
        read: true,
        type: "text",
      },
      {
        id: "7",
        senderId: "farmer1",
        receiverId: "user1",
        content: "terima kasih sudah berinvestasi di lahan cabai saya",
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        type: "text",
      },
    ];

    setMessages(mockMessages);
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: user?.id || "user1",
        receiverId: chatRooms.find((c) => c.id === selectedChat)?.user.id || "",
        content: newMessage,
        timestamp: new Date(),
        read: false,
        type: "text",
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // update last message in chat room
      setChatRooms((prev) =>
        prev.map((room) =>
          room.id === selectedChat ? { ...room, lastMessage: message } : room
        )
      );
    }
  };

  const currentChat = chatRooms.find((c) => c.id === selectedChat);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "baru saja";
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 24 * 60)
      return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return date.toLocaleDateString("id-ID");
  };

  return (
    <div className="page active">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {!showChatList && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setShowChatList(true)}
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="page-title">chat</h1>
            <p className="page-subtitle">
              komunikasi langsung dengan petani/investor
            </p>
          </div>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: "1rem", height: "calc(100vh - 200px)" }}
      >
        {/* Chat List */}
        <div
          style={{
            flex: showChatList ? "1" : "0",
            display: showChatList ? "block" : "none",
            minWidth: "300px",
          }}
        >
          <div
            className="card"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className="card-header">
              <h3 className="card-title">pesan</h3>
              <button className="btn btn-outline btn-sm">
                <Search size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflow: "auto" }}>
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`chat-item ${
                    selectedChat === room.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(room.id);
                    setShowChatList(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-color)",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                    background:
                      selectedChat === room.id
                        ? "var(--light-green)"
                        : "transparent",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: `url(${room.user.avatar}) center/cover`,
                        backgroundColor: "var(--primary-green)",
                      }}
                    />
                    {room.user.online && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "var(--primary-green)",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4 style={{ fontWeight: "600", fontSize: "1rem" }}>
                        {room.user.name}
                      </h4>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-light)",
                        }}
                      >
                        {formatTime(room.lastMessage.timestamp)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.9rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {room.lastMessage.content}
                      </p>
                      {room.unreadCount > 0 && (
                        <span
                          style={{
                            background: "var(--primary-green)",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                          }}
                        >
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div
          style={{
            flex: "2",
            display: showChatList ? "block" : "block",
            minWidth: "400px",
          }}
        >
          {currentChat ? (
            <div
              className="card"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Chat Header */}
              <div className="card-header">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: `url(${currentChat.user.avatar}) center/cover`,
                      backgroundColor: "var(--primary-green)",
                    }}
                  />
                  <div>
                    <h4 style={{ fontWeight: "600" }}>
                      {currentChat.user.name}
                    </h4>
                    <p
                      style={{ color: "var(--text-light)", fontSize: "0.8rem" }}
                    >
                      {currentChat.user.online
                        ? "online"
                        : `terakhir dilihat ${formatLastSeen(
                            currentChat.user.lastSeen
                          )}`}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn btn-outline btn-sm">
                    <Phone size={16} />
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <Video size={16} />
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: "flex",
                      justifyContent:
                        message.senderId === user?.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "0.75rem 1rem",
                        borderRadius: "16px",
                        background:
                          message.senderId === user?.id
                            ? "var(--primary-green)"
                            : "var(--border-color)",
                        color:
                          message.senderId === user?.id
                            ? "white"
                            : "var(--text-dark)",
                      }}
                    >
                      <p style={{ marginBottom: "0.25rem" }}>
                        {message.content}
                      </p>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          opacity: 0.7,
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div
                style={{
                  padding: "1rem",
                  borderTop: "1px solid var(--border-color)",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <button className="btn btn-outline btn-sm">
                  <Paperclip size={16} />
                </button>
                <button className="btn btn-outline btn-sm">
                  <Camera size={16} />
                </button>
                <input
                  type="text"
                  placeholder="ketik pesan..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="card"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h3>pilih chat untuk memulai percakapan</h3>
                <p style={{ color: "var(--text-light)" }}>
                  komunikasi langsung dengan petani atau investor
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
