"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FarmData {
  id: number;
  name: string;
  crop: string;
  area: number;
  status: string;
  investmentAmount: number;
  investors: number;
  progress: number;
}

interface RecentActivity {
  id: number;
  type: string;
  message: string;
  time: string;
}

export default function FarmerDashboardPage() {
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    const mockFarms: FarmData[] = [
      {
        id: 1,
        name: "Lahan Cabai Utama",
        crop: "Cabai Merah",
        area: 2.5,
        status: "planting",
        investmentAmount: 32000000,
        investors: 8,
        progress: 65,
      },
      {
        id: 2,
        name: "Lahan Tomat Hidroponik",
        crop: "Tomat Cherry",
        area: 1.2,
        status: "funding",
        investmentAmount: 5000000,
        investors: 3,
        progress: 25,
      },
    ];

    const mockActivities: RecentActivity[] = [
      {
        id: 1,
        type: "investment",
        message: "Investasi baru masuk untuk lahan cabai - Rp 2.000.000",
        time: "2 jam lalu",
      },
      {
        id: 2,
        type: "order",
        message: "Pesanan baru: 5kg cabai merah dari Sarah I.",
        time: "4 jam lalu",
      },
      {
        id: 3,
        type: "sensor",
        message: "Data sensor menunjukkan kondisi optimal untuk pertumbuhan",
        time: "6 jam lalu",
      },
    ];

    setFarms(mockFarms);
    setActivities(mockActivities);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "funding":
        return "Pendanaan";
      case "planting":
        return "Penanaman";
      case "harvesting":
        return "Panen";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  const totalInvestment = farms.reduce(
    (sum, farm) => sum + farm.investmentAmount,
    0
  );
  const totalInvestors = farms.reduce((sum, farm) => sum + farm.investors, 0);
  const activeFarms = farms.filter(
    (farm) => farm.status !== "completed"
  ).length;

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Dashboard Petani</h1>
        <p className="page-subtitle">Selamat datang, Ahmad Suryadi</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-value">{formatCurrency(totalInvestment)}</div>
          <div className="stat-label">Total Investasi</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value">{activeFarms}</div>
          <div className="stat-label">Lahan Aktif</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">{totalInvestors}</div>
          <div className="stat-label">Total Investor</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lahan Saya</h3>
          <Link href="/my-farms" className="btn btn-sm btn-outline">
            Kelola Lahan
          </Link>
        </div>
        <div className="grid grid-2">
          {farms.map((farm) => (
            <div key={farm.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h4 style={{ marginBottom: "0.5rem" }}>{farm.name}</h4>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    {farm.crop} • {farm.area} Ha
                  </p>
                </div>
                <span className={`status-badge status-${farm.status}`}>
                  {getStatusText(farm.status)}
                </span>
              </div>
              <div
                className="stats-grid"
                style={{
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: "1rem",
                }}
              >
                <div className="stat-card green" style={{ padding: "1rem" }}>
                  <div className="stat-value" style={{ fontSize: "1.2rem" }}>
                    {formatCurrency(farm.investmentAmount)}
                  </div>
                  <div className="stat-label">Investasi</div>
                </div>
                <div className="stat-card blue" style={{ padding: "1rem" }}>
                  <div className="stat-value" style={{ fontSize: "1.2rem" }}>
                    {farm.investors}
                  </div>
                  <div className="stat-label">Investor</div>
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>Progress</span>
                  <span>{farm.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${farm.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Aktivitas Terbaru</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "1rem",
                background: "var(--bg-light)",
                borderRadius: "8px",
              }}
            >
              <div>
                <p style={{ marginBottom: "0.25rem" }}>{activity.message}</p>
                <p style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                  {activity.time}
                </p>
              </div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    activity.type === "investment"
                      ? "var(--primary-green)"
                      : activity.type === "order"
                      ? "var(--secondary-blue)"
                      : "var(--secondary-orange)",
                  marginTop: "0.5rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Akses Cepat</h3>
        </div>
        <div className="grid grid-2">
          <Link href="/learning" className="btn btn-primary">
            📚 Pusat Pembelajaran
          </Link>
          <Link href="/products/create" className="btn btn-secondary">
            📦 Tambah Produk
          </Link>
          <Link href="/monitoring" className="btn btn-outline">
            📊 Monitoring IoT
          </Link>
          <Link href="/chat" className="btn btn-outline">
            💬 Chat dengan Investor
          </Link>
        </div>
      </div>
    </div>
  );
}
