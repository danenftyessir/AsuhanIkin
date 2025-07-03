"use client";

import { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity, Leaf, Camera, AlertTriangle, CheckCircle } from "lucide-react";

interface IoTData {
  id: string;
  farmName: string;
  location: string;
  temperature: number;
  humidity: number;
  soilPh: number;
  nutrients: number;
  lastUpdate: Date;
  status: "normal" | "warning" | "critical";
  alerts: string[];
}

interface GrowthProgress {
  stage: string;
  description: string;
  progress: number;
  date: Date;
}

export default function MonitoringPage() {
  const [farms, setFarms] = useState<IoTData[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    loadMonitoringData();
  }, []);

  const loadMonitoringData = () => {
    const mockData: IoTData[] = [
      {
        id: "1",
        farmName: "lahan cabai utama",
        location: "boyolali, jawa tengah",
        temperature: 28.5,
        humidity: 75,
        soilPh: 6.8,
        nutrients: 85,
        lastUpdate: new Date(),
        status: "normal",
        alerts: []
      },
      {
        id: "2",
        farmName: "lahan tomat hidroponik",
        location: "cianjur, jawa barat",
        temperature: 32.1,
        humidity: 45,
        soilPh: 6.2,
        nutrients: 62,
        lastUpdate: new Date(Date.now() - 15 * 60000),
        status: "warning",
        alerts: ["suhu terlalu tinggi", "kelembaban rendah"]
      },
      {
        id: "3",
        farmName: "lahan jagung organik",
        location: "lampung timur",
        temperature: 29.1,
        humidity: 70,
        soilPh: 6.9,
        nutrients: 92,
        lastUpdate: new Date(Date.now() - 5 * 60000),
        status: "normal",
        alerts: []
      }
    ];

    setFarms(mockData);
    setSelectedFarm(mockData[0]?.id || "");
    setLoading(false);
  };

  const currentFarm = farms.find(f => f.id === selectedFarm);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "var(--primary-green)";
      case "warning": return "var(--secondary-orange)";
      case "critical": return "#e74c3c";
      default: return "var(--text-light)";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <CheckCircle size={20} color="var(--primary-green)" />;
      case "warning": return <AlertTriangle size={20} color="var(--secondary-orange)" />;
      case "critical": return <AlertTriangle size={20} color="#e74c3c" />;
      default: return <Activity size={20} />;
    }
  };

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case "temperature":
        if (value >= 25 && value <= 30) return "normal";
        if (value >= 20 && value <= 35) return "warning";
        return "critical";
      case "humidity":
        if (value >= 60 && value <= 80) return "normal";
        if (value >= 40 && value <= 90) return "warning";
        return "critical";
      case "ph":
        if (value >= 6.0 && value <= 7.0) return "normal";
        if (value >= 5.5 && value <= 7.5) return "warning";
        return "critical";
      case "nutrients":
        if (value >= 70) return "normal";
        if (value >= 50) return "warning";
        return "critical";
      default:
        return "normal";
    }
  };

  const progressData: GrowthProgress[] = [
    {
      stage: "perkecambahan",
      description: "benih berhasil berkecambah dengan tingkat keberhasilan 95%",
      progress: 100,
      date: new Date("2025-06-05")
    },
    {
      stage: "pertumbuhan vegetatif",
      description: "tanaman tumbuh dengan baik, tinggi rata-rata 25cm",
      progress: 75,
      date: new Date("2025-06-20")
    },
    {
      stage: "pembungaan",
      description: "mulai muncul bunga, perlu perhatian khusus untuk penyiraman",
      progress: 45,
      date: new Date("2025-07-01")
    },
    {
      stage: "pembuahan",
      description: "fase pembentukan buah, monitoring nutrisi intensif",
      progress: 0,
      date: new Date("2025-07-15")
    }
  ];

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">monitoring iot</h1>
        <p className="page-subtitle">pantau kondisi lahan secara real-time</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">pilih lahan</h3>
        </div>
        <div className="filter-bar">
          {farms.map((farm) => (
            <button
              key={farm.id}
              className={`filter-btn ${selectedFarm === farm.id ? "active" : ""}`}
              onClick={() => setSelectedFarm(farm.id)}
            >
              {farm.farmName}
            </button>
          ))}
        </div>
      </div>

      {currentFarm && (
        <>
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">{currentFarm.farmName}</h3>
                <p className="card-subtitle">{currentFarm.location}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {getStatusIcon(currentFarm.status)}
                <span style={{ color: getStatusColor(currentFarm.status), fontWeight: "500" }}>
                  {currentFarm.status}
                </span>
              </div>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
              update terakhir: {currentFarm.lastUpdate.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ 
                  background: getStatusColor(getSensorStatus(currentFarm.temperature, "temperature")),
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "12px"
                }}>
                  <Thermometer size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    {currentFarm.temperature}°C
                  </div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    suhu udara
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                optimal: 25-30°C
              </div>
            </div>

            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ 
                  background: getStatusColor(getSensorStatus(currentFarm.humidity, "humidity")),
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "12px"
                }}>
                  <Droplets size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    {currentFarm.humidity}%
                  </div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    kelembaban
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                optimal: 60-80%
              </div>
            </div>

            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ 
                  background: getStatusColor(getSensorStatus(currentFarm.soilPh, "ph")),
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "12px"
                }}>
                  <Activity size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    {currentFarm.soilPh}
                  </div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    ph tanah
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                optimal: 6.0-7.0
              </div>
            </div>

            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ 
                  background: getStatusColor(getSensorStatus(currentFarm.nutrients, "nutrients")),
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "12px"
                }}>
                  <Leaf size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                    {currentFarm.nutrients}%
                  </div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    nutrisi tanah
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                optimal: {'>'}70%
              </div>
            </div>
          </div>

          {currentFarm.alerts.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">peringatan</h3>
                <AlertTriangle size={20} color="var(--secondary-orange)" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {currentFarm.alerts.map((alert, index) => (
                  <div key={index} style={{ 
                    background: "#fff3cd",
                    color: "#856404",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    borderLeft: "4px solid var(--secondary-orange)"
                  }}>
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">live camera</h3>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setShowCamera(!showCamera)}
              >
                <Camera size={16} />
                {showCamera ? "tutup" : "buka"} kamera
              </button>
            </div>
            {showCamera && (
              <div style={{ 
                width: "100%",
                height: "250px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "500"
              }}>
                🎥 live feed dari lahan
                <br />
                <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  (simulasi camera untuk demo)
                </span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">progress pertumbuhan</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {progressData.map((stage, index) => (
                <div key={index} style={{ 
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "1rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h4 style={{ fontWeight: "600", textTransform: "capitalize" }}>
                      {stage.stage}
                    </h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                      {stage.date.toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    {stage.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.9rem" }}>progress</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{stage.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}