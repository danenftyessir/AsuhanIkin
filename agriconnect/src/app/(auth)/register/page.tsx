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
      newErrors.name = "nama lengkap wajib diisi";
    } else if (formData.name.length < 3) {
      newErrors.name = "nama minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "nomor telepon wajib diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formData.phone)) {
      newErrors.phone = "format nomor telepon tidak valid";
    }

    if (!formData.location.trim()) {
      newErrors.location = "lokasi wajib diisi";
    }

    if (!formData.password.trim()) {
      newErrors.password = "password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "password minimal 6 karakter";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "password tidak cocok";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
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
        router.push("/login?registered=true");
      } else {
        setErrors({ general: data.message || "pendaftaran gagal" });
      }
    } catch (error) {
      setErrors({ general: "terjadi kesalahan, coba lagi" });
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
            daftar akun
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            bergabung dengan platform pertanian terdepan
          </p>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
            <button
              type="button"
              className={`btn ${
                selectedRole === "INVESTOR" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setSelectedRole("INVESTOR")}
              style={{ flex: 1 }}
            >
              <User size={16} />
              investor
            </button>
            <button
              type="button"
              className={`btn ${
                selectedRole === "FARMER" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setSelectedRole("FARMER")}
              style={{ flex: 1 }}
            >
              <Truck size={16} />
              petani
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>nama lengkap</label>
              <div style={{ position: "relative" }}>
                <User
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
                  placeholder="masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={`form-input ${errors.name ? "error" : ""}`}
                  style={{ paddingLeft: "3rem" }}
                />
              </div>
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="input-group">
              <label>email</label>
              <div style={{ position: "relative" }}>
                <Mail
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
                  type="email"
                  placeholder="masukkan email anda"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`form-input ${errors.email ? "error" : ""}`}
                  style={{ paddingLeft: "3rem" }}
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label>nomor telepon</label>
              <div style={{ position: "relative" }}>
                <Phone
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
                  type="tel"
                  placeholder="contoh: 08123456789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  style={{ paddingLeft: "3rem" }}
                />
              </div>
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="input-group">
              <label>lokasi</label>
              <div style={{ position: "relative" }}>
                <MapPin
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
                  placeholder="contoh: jakarta selatan"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className={`form-input ${errors.location ? "error" : ""}`}
                  style={{ paddingLeft: "3rem" }}
                />
              </div>
              {errors.location && (
                <span className="error-message">{errors.location}</span>
              )}
            </div>

            <div className="input-group">
              <label>password</label>
              <div style={{ position: "relative" }}>
                <Lock
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
                  type={showPassword ? "text" : "password"}
                  placeholder="minimal 6 karakter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={`form-input ${errors.password ? "error" : ""}`}
                  style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-light)",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label>konfirmasi password</label>
              <div style={{ position: "relative" }}>
                <Lock
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
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className={`form-input ${
                    errors.confirmPassword ? "error" : ""
                  }`}
                  style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-light)",
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="input-group">
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeTerms: e.target.checked,
                    }))
                  }
                  className={errors.agreeTerms ? "error" : ""}
                  style={{ marginTop: "0.25rem" }}
                />
                <span>
                  saya menyetujui{" "}
                  <Link href="/terms" style={{ color: "var(--primary-green)" }}>
                    syarat dan ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link
                    href="/privacy"
                    style={{ color: "var(--primary-green)" }}
                  >
                    kebijakan privasi
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="error-message">{errors.agreeTerms}</span>
              )}
            </div>

            {errors.general && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1px solid #feb2b2",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ color: "#c53030", margin: 0, fontSize: "0.9rem" }}>
                  {errors.general}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "mendaftar..." : "daftar"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
              sudah punya akun?{" "}
              <Link
                href="/login"
                style={{ color: "var(--primary-green)", fontWeight: "500" }}
              >
                masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
