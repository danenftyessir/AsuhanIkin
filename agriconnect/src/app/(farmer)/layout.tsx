"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Shield,
  Package,
  BookOpen,
  MessageCircle,
  User,
  Bell,
} from "lucide-react";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/farmer-dashboard", icon: Home, label: "Beranda" },
    { href: "/my-farms", icon: Shield, label: "Lahan" },
    { href: "/products", icon: Package, label: "Produk" },
    { href: "/learning", icon: BookOpen, label: "Belajar" },
    { href: "/chat", icon: MessageCircle, label: "Chat" },
  ];

  const notifications = [
    {
      id: 1,
      type: "investment",
      message: "Investasi baru masuk untuk lahan cabai Anda",
      time: "2 jam lalu",
      read: false,
    },
    {
      id: 2,
      type: "order",
      message: "Pesanan baru: 5kg cabai merah",
      time: "4 jam lalu",
      read: false,
    },
    {
      id: 3,
      type: "system",
      message: "Sensor IoT mendeteksi kelembaban rendah",
      time: "6 jam lalu",
      read: true,
    },
  ];

  return (
    <div className="app-container">
      <div className="mobile-header">
        <div className="logo">🌱 AgriConnect</div>
        <div className="header-actions">
          <button
            className="header-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} />
            <span className="notification-badge">2</span>
          </button>
          <Link href="/profile" className="header-btn">
            <User size={24} />
          </Link>
        </div>
      </div>

      {showNotifications && (
        <div className="notification-panel active">
          <div className="notification-header">
            <h3>Notifikasi</h3>
          </div>
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  !notification.read ? "unread" : ""
                }`}
              >
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="main-content">{children}</div>

      <div className="bottom-nav">
        <div className="nav-items">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
