"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Truck,
  Phone,
  MapPin,
  Loader,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"INVESTOR" | "FARMER">(
    "INVESTOR"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nama minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokasi wajib diisi";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Bersihkan error sebelumnya

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect ke halaman login dengan notifikasi sukses
        router.push("/login?registered=true");
      } else {
        // Tampilkan pesan error dari backend
        setErrors({ general: data.message || "Pendaftaran gagal, silakan coba lagi." });
      }
    } catch (error) {
      setErrors({ general: "Terjadi kesalahan pada jaringan. Mohon coba kembali." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <Link
          href="/"
          className="logo-large"
          style={{ fontSize: "2.5rem", marginBottom: "2rem" }}
        >
          🌱 AgriConnect
        </Link>

        <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Daftar Akun
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            Bergabung dengan platform pertanian terdepan.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
            <button
              className={`role-btn-toggle ${
                selectedRole === "INVESTOR" ? "active" : ""
              }`}
              onClick={() => setSelectedRole("INVESTOR")}
            >
              <User size={16} />
              Investor
            </button>
            <button
              className={`role-btn-toggle ${
                selectedRole === "FARMER" ? "active" : ""
              }`}
              onClick={() => setSelectedRole("FARMER")}
            >
              <Truck size={16} />
              Petani
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Menampilkan pesan error umum */}
            {errors.general && (
              <div className="error-box">
                <p>{errors.general}</p>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="name">Nama Lengkap</label>
              <div className="input-icon-wrapper">
                <User />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  required
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <Mail />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  required
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="input-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <div className="input-icon-wrapper">
                <Phone />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  required
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="location">Lokasi (Kota/Kabupaten)</label>
              <div className="input-icon-wrapper">
                <MapPin />
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Contoh: Boyolali"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`form-input ${errors.location ? "error" : ""}`}
                  required
                />
              </div>
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <Lock />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat password Anda"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-eye-btn"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <div className="input-icon-wrapper">
                <Lock />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password Anda"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-eye-btn"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="input-group-checkbox">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className={errors.agreeTerms ? "error" : ""}
              />
              <label htmlFor="agreeTerms">
                Saya setuju dengan{" "}
                <Link href="/terms" className="link">
                  Syarat & Ketentuan
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <span className="error-message">{errors.agreeTerms}</span>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? <Loader className="animate-spin" /> : "Daftar"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
              Sudah punya akun?{" "}
              <Link
                href="/login"
                style={{ color: "var(--primary-green)", fontWeight: "500" }}
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}