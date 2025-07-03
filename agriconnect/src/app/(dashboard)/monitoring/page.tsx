"use client";

import { useState, useEffect } from "react";

interface IoTSensorData {
  temperature: number;
  humidity: number;
  soilPh: number;
  nutrients: number;
  timestamp: string;
}

interface ProgressStage {
  stage: string;
  description: string;
  status: "completed" | "ongoing" | "pending";
}

export default function MonitoringPage() {
  const [sensorData, setSensorData] = useState<IoTSensorData>({
    temperature: 28,
    humidity: 75,
    soilPh: 6.8,
    nutrients: 85,
    timestamp: new Date().toISOString(),
  });

  const [progressStages] = useState<ProgressStage[]>([
    {
      stage: "Minggu 1-2: Perkecambahan",
      description: "Proses perkecambahan benih",
      status: "completed",
    },
    {
      stage: "Minggu 3-4: Daun Pertama",
      description: "Pertumbuhan daun pertama",
      status: "completed",
    },
    {
      stage: "Minggu 5-8: Pertumbuhan Vegetatif",
      description: "Fase pertumbuhan vegetatif aktif",
      status: "ongoing",
    },
    {
      stage: "Minggu 9-12: Pembungaan",
      description: "Fase pembungaan dan pembentukan buah",
      status: "pending",
    },
  ]);

  useEffect(() => {
    // simulate real-time IoT data updates
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        temperature: +(25 + Math.random() * 10).toFixed(1),
        humidity: +(60 + Math.random() * 30).toFixed(0),
        soilPh: +(6.0 + Math.random() * 2).toFixed(1),
        nutrients: +(70 + Math.random() * 30).toFixed(0),
        timestamp: new Date().toISOString(),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case "temperature":
        return value >= 20 && value <= 35
          ? "good"
          : value > 35
          ? "warning"
          : "danger";
      case "humidity":
        return value >= 60 && value <= 80
          ? "good"
          : value > 80
          ? "warning"
          : "danger";
      case "ph":
        return value >= 6.0 && value <= 7.5 ? "good" : "warning";
      case "nutrients":
        return value >= 70 ? "good" : value >= 50 ? "warning" : "danger";
      default:
        return "good";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "good":
        return "Optimal";
      case "warning":
        return "Perhatian";
      case "danger":
        return "Bahaya";
      default:
        return "Normal";
    }
  };

  const getProgressIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "ongoing":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "⏳";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "var(--primary-green)";
      case "ongoing":
        return "var(--secondary-blue)";
      case "pending":
        return "var(--text-light)";
      default:
        return "var(--text-light)";
    }
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Monitoring IoT</h1>
        <p className="page-subtitle">
          Pantau kondisi real-time lahan investasi Anda
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Live Camera Feed</h3>
          <span className="status-badge status-funding">🔴 LIVE</span>
        </div>
        <div
          style={{
            background: "#000",
            borderRadius: "12px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📹</div>
            <p>Live Camera Feed</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Lahan Cabai - Ahmad Suryadi
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Sensor Data Real-time</h3>
        <div className="iot-grid">
          <div className="iot-sensor">
            <div className="iot-icon">🌡️</div>
            <div
              className="iot-value"
              style={{ color: "var(--primary-green)" }}
            >
              {sensorData.temperature}°C
            </div>
            <div className="iot-label">Suhu Tanah</div>
            <div
              className={`iot-status ${getSensorStatus(
                sensorData.temperature,
                "temperature"
              )}`}
            >
              {getStatusText(
                getSensorStatus(sensorData.temperature, "temperature")
              )}
            </div>
          </div>
          <div className="iot-sensor">
            <div className="iot-icon">💧</div>
            <div
              className="iot-value"
              style={{ color: "var(--secondary-blue)" }}
            >
              {sensorData.humidity}%
            </div>
            <div className="iot-label">Kelembaban</div>
            <div
              className={`iot-status ${getSensorStatus(
                sensorData.humidity,
                "humidity"
              )}`}
            >
              {getStatusText(getSensorStatus(sensorData.humidity, "humidity"))}
            </div>
          </div>
          <div className="iot-sensor">
            <div className="iot-icon">⚗️</div>
            <div
              className="iot-value"
              style={{ color: "var(--secondary-purple)" }}
            >
              {sensorData.soilPh}
            </div>
            <div className="iot-label">pH Tanah</div>
            <div
              className={`iot-status ${getSensorStatus(
                sensorData.soilPh,
                "ph"
              )}`}
            >
              {getStatusText(getSensorStatus(sensorData.soilPh, "ph"))}
            </div>
          </div>
          <div className="iot-sensor">
            <div className="iot-icon">🌱</div>
            <div
              className="iot-value"
              style={{ color: "var(--secondary-orange)" }}
            >
              {sensorData.nutrients}%
            </div>
            <div className="iot-label">Nutrisi NPK</div>
            <div
              className={`iot-status ${getSensorStatus(
                sensorData.nutrients,
                "nutrients"
              )}`}
            >
              {getStatusText(
                getSensorStatus(sensorData.nutrients, "nutrients")
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Progress Pertumbuhan</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {progressStages.map((stage, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{stage.stage}</span>
              <span style={{ color: getProgressColor(stage.status) }}>
                {getProgressIcon(stage.status)}{" "}
                {stage.status === "completed"
                  ? "Selesai"
                  : stage.status === "ongoing"
                  ? "Berlangsung"
                  : "Menunggu"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
