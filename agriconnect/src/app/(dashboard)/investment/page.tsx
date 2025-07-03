"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Investment {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  roi: string;
  duration: string;
  minInvest: string;
  target: string;
  collected: string;
  investors: number;
  status: string;
  progress: number;
  image: string;
}

export default function InvestmentPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    const mockInvestments: Investment[] = [
      {
        id: 1,
        title: "Cabai Merah Premium",
        subtitle: "Boyolali, Jawa Tengah",
        description:
          "Proyek penanaman cabai merah dengan sistem IoT monitoring. Varietas unggul dengan produktivitas tinggi dan tahan hama.",
        roi: "18%",
        duration: "6 bulan",
        minInvest: "Rp 1.000.000",
        target: "Rp 50.000.000",
        collected: "Rp 32.000.000",
        investors: 8,
        status: "funding",
        progress: 65,
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
      },
      {
        id: 2,
        title: "Jagung Manis Organik",
        subtitle: "Lampung Timur",
        description:
          "Budidaya jagung manis organik dengan metode ramah lingkungan. Hasil panen dijamin berkualitas premium.",
        roi: "15%",
        duration: "4 bulan",
        minInvest: "Rp 500.000",
        target: "Rp 25.000.000",
        collected: "Rp 18.000.000",
        investors: 4,
        status: "planting",
        progress: 85,
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=600",
      },
      {
        id: 3,
        title: "Tomat Cherry Hidroponik",
        subtitle: "Cianjur, Jawa Barat",
        description:
          "Teknologi hidroponik modern untuk menghasilkan tomat cherry berkualitas tinggi. Sistem otomatis untuk hasil optimal.",
        roi: "22%",
        duration: "3 bulan",
        minInvest: "Rp 2.000.000",
        target: "Rp 15.000.000",
        collected: "Rp 5.000.000",
        investors: 3,
        status: "funding",
        progress: 25,
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
      },
    ];

    setInvestments(mockInvestments);
  }, []);

  const filteredInvestments =
    currentFilter === "all"
      ? investments
      : investments.filter((inv) => inv.status === currentFilter);

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

  const filterButtons = [
    { key: "all", label: "Semua" },
    { key: "funding", label: "Pendanaan" },
    { key: "planting", label: "Penanaman" },
    { key: "harvesting", label: "Panen" },
  ];

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Peluang Investasi</h1>
        <p className="page-subtitle">
          Temukan proyek pertanian terbaik untuk investasi Anda
        </p>
      </div>

      <div className="filter-bar">
        {filterButtons.map((button) => (
          <button
            key={button.key}
            className={`filter-btn ${
              currentFilter === button.key ? "active" : ""
            }`}
            onClick={() => setCurrentFilter(button.key)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {filteredInvestments.map((investment) => (
          <div key={investment.id} className="investment-card">
            <Image
              src={investment.image}
              alt={investment.title}
              width={600}
              height={200}
              className="investment-image"
            />
            <div className="investment-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h3 className="investment-title">{investment.title}</h3>
                  <p className="investment-subtitle">{investment.subtitle}</p>
                </div>
                <span className={`status-badge status-${investment.status}`}>
                  {getStatusText(investment.status)}
                </span>
              </div>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                {investment.description}
              </p>
              <div className="investment-stats">
                <div className="investment-stat">
                  <div
                    className="investment-stat-value"
                    style={{ color: "var(--primary-green)" }}
                  >
                    {investment.roi}
                  </div>
                  <div className="investment-stat-label">ROI Proyeksi</div>
                </div>
                <div className="investment-stat">
                  <div className="investment-stat-value">
                    {investment.duration}
                  </div>
                  <div className="investment-stat-label">Durasi</div>
                </div>
                <div className="investment-stat">
                  <div className="investment-stat-value">
                    {investment.investors}
                  </div>
                  <div className="investment-stat-label">Investor</div>
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
                  <span>Progress Pendanaan</span>
                  <span>{investment.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${investment.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
