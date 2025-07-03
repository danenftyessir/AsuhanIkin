"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, MapPin, Star, Award, Target, Clock } from "lucide-react";

interface RecommendationInvestment {
  id: string;
  title: string;
  description: string;
  location: string;
  roi: number;
  duration: number;
  minInvest: number;
  target: number;
  collected: number;
  status: string;
  category: string;
  image: string;
  riskLevel: "low" | "medium" | "high";
  score: number;
  farmer: {
    id: string;
    name: string;
    rating: number;
    experience: number;
    verified: boolean;
    avatar: string;
  };
}

interface InvestmentRecommendationsProps {
  userLocation?: string;
  userBudget?: number;
  userRiskLevel?: "low" | "medium" | "high";
  userCategory?: string;
}

export default function InvestmentRecommendations({
  userLocation,
  userBudget,
  userRiskLevel,
  userCategory,
}: InvestmentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<
    RecommendationInvestment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecommendations();
  }, [userLocation, userBudget, userRiskLevel, userCategory]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (userLocation) params.append("location", userLocation);
      if (userBudget) params.append("budget", userBudget.toString());
      if (userRiskLevel) params.append("riskLevel", userRiskLevel);
      if (userCategory) params.append("category", userCategory);

      const response = await fetch(
        `/api/investments/recommendations?${params}`
      );
      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data);
      } else {
        setError(data.message || "gagal mengambil rekomendasi");
      }
    } catch (err) {
      setError("terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "var(--primary-green)";
      case "medium":
        return "var(--secondary-orange)";
      case "high":
        return "#e74c3c";
      default:
        return "var(--text-light)";
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case "low":
        return "rendah";
      case "medium":
        return "sedang";
      case "high":
        return "tinggi";
      default:
        return level;
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">rekomendasi investasi</h3>
        </div>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>menganalisis rekomendasi terbaik untuk anda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">rekomendasi investasi</h3>
        </div>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "#e74c3c" }}>error: {error}</p>
          <button
            className="btn btn-outline btn-sm"
            onClick={fetchRecommendations}
            style={{ marginTop: "1rem" }}
          >
            coba lagi
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">rekomendasi investasi</h3>
        </div>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <TrendingUp
            size={48}
            style={{ color: "var(--text-light)", marginBottom: "1rem" }}
          />
          <p>belum ada rekomendasi yang sesuai dengan kriteria anda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">rekomendasi investasi</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Award size={16} color="var(--primary-green)" />
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--primary-green)",
              fontWeight: "500",
            }}
          >
            ai powered
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {recommendations.map((investment) => (
          <div key={investment.id} className="card" style={{ margin: 0 }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Image
                src={investment.image}
                alt={investment.title}
                width={120}
                height={120}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                    {investment.title}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--primary-green)",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      score: {investment.score}
                    </div>
                    <div
                      style={{
                        background: getRiskLevelColor(investment.riskLevel),
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      {getRiskLevelText(investment.riskLevel)}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <MapPin size={14} color="var(--text-light)" />
                  <span
                    style={{ color: "var(--text-light)", fontSize: "0.9rem" }}
                  >
                    {investment.location}
                  </span>
                </div>

                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {investment.description.length > 100
                    ? investment.description.substring(0, 100) + "..."
                    : investment.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {investment.farmer.name}
                        </span>
                        {investment.farmer.verified && (
                          <span style={{ color: "var(--primary-green)" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.8rem",
                          color: "var(--text-light)",
                        }}
                      >
                        <Star size={12} fill="currentColor" color="#ffd700" />
                        <span>{investment.farmer.rating}</span>
                        <span>•</span>
                        <span>{investment.farmer.experience} tahun</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "var(--primary-green)",
                      }}
                    >
                      {investment.roi}%
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      roi
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "var(--secondary-orange)",
                      }}
                    >
                      {investment.duration}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      bulan
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "var(--secondary-blue)",
                      }}
                    >
                      {formatCurrency(investment.minInvest)}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      minimal
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    detail
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ flex: 2 }}
                  >
                    invest sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--light-green)",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <TrendingUp size={16} color="var(--primary-green)" />
          <strong style={{ color: "var(--primary-green)" }}>
            rekomendasi berbasis ai
          </strong>
        </div>
        <p style={{ color: "var(--text-dark)", lineHeight: "1.4" }}>
          rekomendasi ini dibuat berdasarkan analisis data cuaca, produktivitas
          wilayah, track record petani, dan preferensi investasi anda
          menggunakan algoritma machine learning.
        </p>
      </div>
    </div>
  );
}
