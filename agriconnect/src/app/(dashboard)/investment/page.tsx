"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInvestments } from "@/hooks/use-investments";
import { formatCurrency } from "@/lib/utils";
import { Investment } from "@/types";
import {
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  Star,
  Filter,
  Search,
  DollarSign,
  Clock,
  Shield,
  Award,
  Eye,
  Heart,
} from "lucide-react";

export default function InvestmentPage() {
  const { investments, loading, error } = useInvestments();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const statusOptions = [
    { key: "all", label: "semua status", color: "var(--text-light)" },
    { key: "FUNDING", label: "pendanaan", color: "var(--secondary-blue)" },
    { key: "PLANTING", label: "penanaman", color: "var(--secondary-orange)" },
    { key: "HARVESTING", label: "panen", color: "var(--primary-green)" },
    { key: "COMPLETED", label: "selesai", color: "var(--text-light)" },
  ];

  const categories = [
    { key: "semua", label: "semua kategori" },
    { key: "sayuran", label: "sayuran" },
    { key: "buah", label: "buah" },
    { key: "rempah", label: "rempah" },
    { key: "beras", label: "beras" },
    { key: "organik", label: "organik" },
  ];

  const sortOptions = [
    { key: "terbaru", label: "terbaru" },
    { key: "roi", label: "roi tertinggi" },
    { key: "progress", label: "progress" },
    { key: "populer", label: "populer" },
    { key: "deadline", label: "deadline" },
  ];

  const filteredInvestments = investments.filter((investment) => {
    const matchesStatus =
      selectedStatus === "all" || investment.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "semua" || investment.category === selectedCategory;
    const matchesSearch =
      investment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      investment.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortBy) {
      case "roi":
        return b.roi - a.roi;
      case "progress":
        return (b.progress || 0) - (a.progress || 0);
      case "populer":
        return (b.investorsCount || 0) - (a.investorsCount || 0);
      case "deadline":
        return (a.daysLeft || 0) - (b.daysLeft || 0);
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const handleInvest = (investmentId: string) => {
    console.log("invest in", investmentId);
  };

  const toggleFavorite = (investmentId: string) => {
    setFavorites((prev) =>
      prev.includes(investmentId)
        ? prev.filter((id) => id !== investmentId)
        : [...prev, investmentId]
    );
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.key === status);
    return statusOption?.color || "var(--text-light)";
  };

  const getStatusText = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.key === status);
    return statusOption?.label || status;
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">investasi pertanian</h1>
        <p className="page-subtitle">
          temukan peluang investasi terbaik dari petani indonesia
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flex: 1,
            }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-light)",
                }}
              />
              <input
                type="text"
                placeholder="cari proyek investasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{ minWidth: "150px" }}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            filter
          </button>
        </div>

        {showFilters && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                status proyek
              </label>
              <div className="filter-bar">
                {statusOptions.map((status) => (
                  <button
                    key={status.key}
                    className={`filter-btn ${
                      selectedStatus === status.key ? "active" : ""
                    }`}
                    onClick={() => setSelectedStatus(status.key)}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                kategori tanaman
              </label>
              <div className="filter-bar">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    className={`filter-btn ${
                      selectedCategory === category.key ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="card">
          <p>memuat investasi...</p>
        </div>
      ) : error ? (
        <div className="card">
          <p style={{ color: "#e74c3c" }}>error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {sortedInvestments.map((investment) => (
            <div key={investment.id} className="investment-card">
              <div style={{ position: "relative" }}>
                <Image
                  src={
                    investment.image ||
                    "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400"
                  }
                  alt={investment.title}
                  width={400}
                  height={200}
                  className="investment-image"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    display: "flex",
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
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => toggleFavorite(investment.id)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "rgba(255,255,255,0.9)",
                    color: favorites.includes(investment.id)
                      ? "#e74c3c"
                      : "var(--text-light)",
                  }}
                >
                  <Heart
                    size={16}
                    fill={
                      favorites.includes(investment.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              <div className="investment-content">
                <div style={{ marginBottom: "1rem" }}>
                  <h3 className="investment-title">{investment.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <MapPin size={14} color="var(--text-light)" />
                    <span className="investment-subtitle">
                      {investment.location}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    {investment.description.length > 100
                      ? investment.description.substring(0, 100) + "..."
                      : investment.description}
                  </p>
                </div>

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
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: investment.farmer.avatar
                        ? `url(${investment.farmer.avatar}) center/cover`
                        : "var(--primary-green)",
                      backgroundColor: "var(--primary-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {!investment.farmer.avatar &&
                      investment.farmer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        {investment.farmer.name}
                      </span>
                      {investment.farmer.verified && (
                        <Shield size={14} color="var(--primary-green)" />
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
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

                <div className="investment-stats">
                  <div className="investment-stat">
                    <div
                      className="investment-stat-value"
                      style={{ color: "var(--primary-green)" }}
                    >
                      {investment.roi}%
                    </div>
                    <div className="investment-stat-label">roi</div>
                  </div>
                  <div className="investment-stat">
                    <div className="investment-stat-value">
                      {investment.duration} bulan
                    </div>
                    <div className="investment-stat-label">durasi</div>
                  </div>
                  <div className="investment-stat">
                    <div className="investment-stat-value">
                      {investment.investorsCount || 0}
                    </div>
                    <div className="investment-stat-label">investor</div>
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
                    <span>progress pendanaan</span>
                    <span>{investment.progress || 0}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${investment.progress || 0}%` }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>
                      terkumpul: {formatCurrency(investment.collected)}
                    </span>
                    <span>target: {formatCurrency(investment.target)}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      minimal investasi
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "var(--primary-green)",
                      }}
                    >
                      {formatCurrency(investment.minInvest)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      sisa waktu
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        color:
                          (investment.daysLeft || 0) <= 7
                            ? "#e74c3c"
                            : "var(--text-dark)",
                      }}
                    >
                      {investment.daysLeft || 0} hari
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Eye size={16} />
                    detail
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleInvest(investment.id)}
                    style={{ flex: 2 }}
                    disabled={investment.status === "COMPLETED"}
                  >
                    <DollarSign size={16} />
                    invest sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedInvestments.length === 0 && !loading && (
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <TrendingUp
              size={48}
              style={{ color: "var(--text-light)", marginBottom: "1rem" }}
            />
            <h3>tidak ada investasi ditemukan</h3>
            <p style={{ color: "var(--text-light)" }}>
              coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">tips investasi</h3>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <ul style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            <li>
              diversifikasi investasi di berbagai jenis tanaman dan lokasi
            </li>
            <li>perhatikan rating dan verifikasi petani</li>
            <li>pantau progress melalui monitoring iot secara berkala</li>
            <li>mulai dengan investasi minimal untuk menguji platform</li>
            <li>komunikasi aktif dengan petani melalui chat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
