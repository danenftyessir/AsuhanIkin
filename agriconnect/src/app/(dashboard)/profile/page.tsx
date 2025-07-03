"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { formatCurrency } from "@/lib/utils";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Edit,
  LogOut,
  TrendingUp,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleSave = () => {
    // implementasi save profile
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="page active">
        <div className="card">
          <p>loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">profil saya</h1>
        <p className="page-subtitle">kelola informasi akun anda</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `url(${user.avatar}) center/cover`,
                backgroundColor: "var(--primary-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "600",
              }}
            >
              {!user.avatar && user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="card-title">{user.name}</h3>
              <p className="card-subtitle">
                {user.role === "INVESTOR" ? "investor" : "petani"}
              </p>
            </div>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={16} />
            {isEditing ? "batal" : "edit"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="input-group">
            <label>nama lengkap</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>nomor telepon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>lokasi</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              disabled={!isEditing}
              className="form-input"
            />
          </div>

          {isEditing && (
            <button className="btn btn-primary btn-full" onClick={handleSave}>
              simpan perubahan
            </button>
          )}
        </div>
      </div>

      {user.role === "INVESTOR" && (
        <div className="card">
          <h3 className="card-title">ringkasan investasi</h3>
          <div className="stats-grid">
            <div className="stat-card green">
              <div className="stat-value">
                {formatCurrency(user.totalInvestment || 0)}
              </div>
              <div className="stat-label">total investasi</div>
            </div>
            <div className="stat-card blue">
              <div className="stat-value">
                {formatCurrency(user.totalReturn || 0)}
              </div>
              <div className="stat-label">total return</div>
            </div>
          </div>
        </div>
      )}

      {user.role === "FARMER" && (
        <div className="card">
          <h3 className="card-title">statistik petani</h3>
          <div className="stats-grid">
            <div className="stat-card green">
              <div className="stat-value">{user.totalProjects || 0}</div>
              <div className="stat-label">total proyek</div>
            </div>
            <div className="stat-card blue">
              <div className="stat-value">{user.rating || 0}</div>
              <div className="stat-label">rating</div>
            </div>
            <div className="stat-card orange">
              <div className="stat-value">{user.experience || 0}</div>
              <div className="stat-label">pengalaman (tahun)</div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">aksi cepat</h3>
        <div className="grid grid-2">
          <button className="btn btn-outline">
            <Phone size={16} />
            hubungi support
          </button>
          <button className="btn btn-outline">
            <Package size={16} />
            riwayat transaksi
          </button>
        </div>
      </div>

      <div className="card">
        <button className="btn btn-secondary btn-full" onClick={handleLogout}>
          <LogOut size={16} />
          keluar
        </button>
      </div>
    </div>
  );
}
