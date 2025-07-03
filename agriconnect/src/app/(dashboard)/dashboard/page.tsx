"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Activity,
  Bell,
  ShoppingCart,
  Camera,
  MessageCircle,
  Plus,
} from "lucide-react";

interface Investment {
  id: string;
  title: string;
  location: string;
  roi: number;
  amount: number;
  progress: number;
  status: string;
  image: string;
  farmer: {
    name: string;
    avatar: string;
  };
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  time: string;
  icon: string;
}

interface Notification {
  id: string;
  type: string;
  message: string;
  time: string;
  read: boolean;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const mockInvestments: Investment[] = [
      {
        id: "1",
        title: "cabai merah premium",
        location: "boyolali, jawa tengah",
        roi: 18,
        amount: 5000000,
        progress: 75,
        status: "planting",
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300",
        farmer: {
          name: "ahmad suryadi",
          avatar: "https://i.pravatar.cc/150?u=ahmad",
        },
      },
      {
        id: "2",
        title: "jagung manis organik",
        location: "lampung timur",
        roi: 15,
        amount: 3000000,
        progress: 45,
        status: "planting",
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=300",
        farmer: {
          name: "siti rahayu",
          avatar: "https://i.pravatar.cc/150?u=siti",
        },
      },
      {
        id: "3",
        title: "tomat cherry hidroponik",
        location: "cianjur, jawa barat",
        roi: 22,
        amount: 2000000,
        progress: 30,
        status: "funding",
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300",
        farmer: {
          name: "budi hartono",
          avatar: "https://i.pravatar.cc/150?u=budi",
        },
      },
    ];

    const mockActivities: RecentActivity[] = [
      {
        id: "1",
        type: "investment",
        message: "investasi cabai merah mencapai progress 75%",
        time: "2 jam lalu",
        icon: "📈",
      },
      {
        id: "2",
        type: "return",
        message: "return investasi jagung manis sebesar rp 450.000",
        time: "1 hari lalu",
        icon: "💰",
      },
      {
        id: "3",
        type: "purchase",
        message: "pembelian cabai segar 2kg berhasil",
        time: "2 hari lalu",
        icon: "🛒",
      },
      {
        id: "4",
        type: "message",
        message: "pesan baru dari ahmad suryadi",
        time: "3 hari lalu",
        icon: "💬",
      },
    ];

    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "investment",
        message: "investasi cabai merah siap panen dalam 2 minggu",
        time: "1 jam lalu",
        read: false,
      },
      {
        id: "2",
        type: "market",
        message: "harga cabai merah naik 15% minggu ini",
        time: "3 jam lalu",
        read: false,
      },
      {
        id: "3",
        type: "system",
        message: "update aplikasi tersedia",
        time: "1 hari lalu",
        read: true,
      },
    ];

    setInvestments(mockInvestments);
    setActivities(mockActivities);
    setNotifications(mockNotifications);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "funding":
        return "var(--secondary-blue)";
      case "planting":
        return "var(--secondary-orange)";
      case "harvesting":
        return "var(--primary-green)";
      case "completed":
        return "var(--text-light)";
      default:
        return "var(--text-light)";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "funding":
        return "pendanaan";
      case "planting":
        return "penanaman";
      case "harvesting":
        return "panen";
      case "completed":
        return "selesai";
      default:
        return status;
    }
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const avgROI =
    investments.reduce((sum, inv) => sum + inv.roi, 0) / investments.length;
  const activeInvestments = investments.filter(
    (inv) => inv.status !== "completed"
  ).length;
  const estimatedReturn = investments.reduce(
    (sum, inv) => sum + inv.amount * (inv.roi / 100),
    0
  );

  if (loading) {
    return (
      <div className="page active">
        <div className="card">
          <p>memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">dashboard investor</h1>
        <p className="page-subtitle">
          selamat datang, {user?.name || "investor"}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-value">{formatCurrency(totalInvestment)}</div>
          <div className="stat-label">total investasi</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value">{activeInvestments}</div>
          <div className="stat-label">investasi aktif</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">{avgROI.toFixed(1)}%</div>
          <div className="stat-label">rata-rata roi</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-value">{formatCurrency(estimatedReturn)}</div>
          <div className="stat-label">estimasi return</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">investasi saya</h3>
          <Link href="/investment" className="btn btn-outline btn-sm">
            lihat semua
          </Link>
        </div>
        <div className="grid grid-2">
          {investments.slice(0, 2).map((investment) => (
            <div key={investment.id} className="card">
              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
              >
                <Image
                  src={investment.image}
                  alt={investment.title}
                  width={80}
                  height={80}
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>
                    {investment.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {investment.location}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        background: getStatusColor(investment.status),
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      {getStatusText(investment.status)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "var(--primary-green)",
                      }}
                    >
                      {investment.roi}% roi
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>progress</span>
                  <span>{investment.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${investment.progress}%` }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                  >
                    investasi saya
                  </div>
                  <div style={{ fontWeight: "600" }}>
                    {formatCurrency(investment.amount)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: `url(${investment.farmer.avatar}) center/cover`,
                      backgroundColor: "var(--primary-green)",
                    }}
                  />
                  <span
                    style={{ fontSize: "0.9rem", color: "var(--text-light)" }}
                  >
                    {investment.farmer.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">aktivitas terbaru</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "var(--bg-light)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "1.5rem" }}>{activity.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: "0.25rem" }}>{activity.message}</p>
                <p style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">notifikasi</h3>
          <span
            style={{
              background: "var(--primary-green)",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            {notifications.filter((n) => !n.read).length}
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "0.75rem",
                background: notification.read
                  ? "transparent"
                  : "var(--light-green)",
                borderRadius: "8px",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: "0.25rem" }}>
                  {notification.message}
                </p>
                <p style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--primary-green)",
                    marginTop: "0.5rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">aksi cepat</h3>
        <div className="grid grid-2">
          <Link href="/investment" className="btn btn-primary">
            <DollarSign size={16} />
            cari investasi
          </Link>
          <Link href="/marketplace" className="btn btn-secondary">
            <ShoppingCart size={16} />
            belanja produk
          </Link>
          <Link href="/monitoring" className="btn btn-outline">
            <Camera size={16} />
            monitoring iot
          </Link>
          <Link href="/chat" className="btn btn-outline">
            <MessageCircle size={16} />
            chat petani
          </Link>
        </div>
      </div>
    </div>
  );
}
