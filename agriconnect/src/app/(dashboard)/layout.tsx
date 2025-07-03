"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  DollarSign,
  ShoppingCart,
  Camera,
  MessageCircle,
  User,
  Bell,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Beranda" },
    { href: "/investment", icon: DollarSign, label: "Investasi" },
    { href: "/marketplace", icon: ShoppingCart, label: "Belanja" },
    { href: "/monitoring", icon: Camera, label: "Monitor" },
    { href: "/chat", icon: MessageCircle, label: "Chat" },
  ];

  const notifications = [
    {
      id: 1,
      type: "investment",
      message: "Investasi Anda di Cabai Merah mencapai progress 75%",
      time: "2 jam lalu",
      read: false,
    },
    {
      id: 2,
      type: "order",
      message: "Pesanan jagung manis Anda sedang dalam perjalanan",
      time: "4 jam lalu",
      read: false,
    },
    {
      id: 3,
      type: "return",
      message: "Return investasi sebesar Rp 2.240.000 telah masuk",
      time: "1 hari lalu",
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
            <span className="notification-badge">3</span>
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
