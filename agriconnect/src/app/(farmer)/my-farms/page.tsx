"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Camera,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Farm {
  id: string;
  name: string;
  crop: string;
  area: number;
  status: "funding" | "planting" | "harvesting" | "completed";
  targetFunding: number;
  currentFunding: number;
  investors: number;
  progress: number;
  plantingDate: Date;
  harvestDate: Date;
  location: string;
  image: string;
  iotSensors: {
    temperature: number;
    humidity: number;
    soilPh: number;
    nutrients: number;
  };
}

export default function MyFarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("semua");

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = () => {
    const mockFarms: Farm[] = [
      {
        id: "1",
        name: "lahan cabai utama",
        crop: "cabai merah",
        area: 2.5,
        status: "planting",
        targetFunding: 50000000,
        currentFunding: 32000000,
        investors: 8,
        progress: 65,
        plantingDate: new Date("2025-06-01"),
        harvestDate: new Date("2025-08-15"),
        location: "boyolali, jawa tengah",
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400",
        iotSensors: {
          temperature: 28.5,
          humidity: 75,
          soilPh: 6.8,
          nutrients: 85,
        },
      },
      {
        id: "2",
        name: "lahan tomat hidroponik",
        crop: "tomat cherry",
        area: 1.2,
        status: "funding",
        targetFunding: 15000000,
        currentFunding: 5000000,
        investors: 3,
        progress: 25,
        plantingDate: new Date("2025-07-15"),
        harvestDate: new Date("2025-09-30"),
        location: "cianjur, jawa barat",
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        iotSensors: {
          temperature: 26.2,
          humidity: 82,
          soilPh: 6.5,
          nutrients: 78,
        },
      },
      {
        id: "3",
        name: "lahan jagung organik",
        crop: "jagung manis",
        area: 3.0,
        status: "harvesting",
        targetFunding: 30000000,
        currentFunding: 30000000,
        investors: 12,
        progress: 95,
        plantingDate: new Date("2025-04-01"),
        harvestDate: new Date("2025-07-10"),
        location: "lampung timur",
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
        iotSensors: {
          temperature: 29.1,
          humidity: 70,
          soilPh: 6.9,
          nutrients: 92,
        },
      },
    ];

    setFarms(mockFarms);
    setLoading(false);
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

  const statusOptions = [
    { key: "semua", label: "semua status" },
    { key: "funding", label: "pendanaan" },
    { key: "planting", label: "penanaman" },
    { key: "harvesting", label: "panen" },
    { key: "completed", label: "selesai" },
  ];

  const filteredFarms =
    selectedStatus === "semua"
      ? farms
      : farms.filter((farm) => farm.status === selectedStatus);

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">lahan saya</h1>
        <p className="page-subtitle">kelola dan pantau lahan pertanian anda</p>
      </div>

      <div className="card">
        <div className="card-header">
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
          <Link href="/my-farms/create" className="btn btn-primary btn-sm">
            <Plus size={16} />
            tambah lahan
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="card">
          <p>memuat data lahan...</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {filteredFarms.map((farm) => (
            <div key={farm.id} className="card card-clickable">
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  background: `url(${farm.image}) center/cover`,
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "0.5rem",
                    background: getStatusColor(farm.status),
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                >
                  {getStatusText(farm.status)}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                  }}
                >
                  {farm.area} Ha
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  {farm.name}
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                  }}
                >
                  <MapPin size={14} />
                  <span>{farm.location}</span>
                </div>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginTop: "0.25rem",
                  }}
                >
                  budidaya {farm.crop}
                </p>
              </div>

              <div
                className="stats-grid"
                style={{
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: "1rem",
                }}
              >
                <div className="stat-card green" style={{ padding: "0.75rem" }}>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    {formatCurrency(farm.currentFunding)}
                  </div>
                  <div className="stat-label">terkumpul</div>
                </div>
                <div className="stat-card blue" style={{ padding: "0.75rem" }}>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    {farm.investors}
                  </div>
                  <div className="stat-label">investor</div>
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
                  <span>{farm.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${farm.progress}%` }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  color: "var(--text-light)",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Calendar size={14} />
                  <span>
                    tanam: {farm.plantingDate.toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Calendar size={14} />
                  <span>
                    panen: {farm.harvestDate.toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-light)",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <h5
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  sensor iot
                </h5>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  <div>suhu: {farm.iotSensors.temperature}°C</div>
                  <div>kelembaban: {farm.iotSensors.humidity}%</div>
                  <div>ph tanah: {farm.iotSensors.soilPh}</div>
                  <div>nutrisi: {farm.iotSensors.nutrients}%</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link
                  href={`/my-farms/${farm.id}`}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <Settings size={16} />
                  kelola
                </Link>
                <Link
                  href={`/monitoring/${farm.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Camera size={16} />
                  monitor
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredFarms.length === 0 && !loading && (
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h3>belum ada lahan</h3>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              mulai dengan mendaftarkan lahan pertanian pertama anda
            </p>
            <Link href="/my-farms/create" className="btn btn-primary">
              <Plus size={16} />
              tambah lahan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
