"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth"; // Hook yang sudah kita perbarui
import { Eye, EyeOff, Mail, Lock, User, Truck, Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading: authLoading } = useAuth(); // Ambil state loading dari useAuth
  const [isSubmitting, setIsSubmitting] = useState(false); // State loading khusus untuk form submit
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"INVESTOR" | "FARMER">(
    "INVESTOR"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Bersihkan error sebelumnya

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect berdasarkan peran dari data pengguna yang dikembalikan
        const userRole = JSON.parse(localStorage.getItem("agri-user") || "{}").role;
        if (userRole === "FARMER") {
          router.push("/farmer-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setErrors({ general: result.message || "Login gagal, periksa kembali email dan password Anda." });
      }
    } catch (error) {
      setErrors({ general: "Terjadi kesalahan, silakan coba lagi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tampilkan loading jika hook sedang memverifikasi token di awal
  if (authLoading) {
      return (
          <div className="landing-page">
              <Loader className="animate-spin" size={48} />
          </div>
      );
  }

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
            Masuk Akun
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            Selamat datang kembali di platform pertanian.
          </p>
          
          {/* Form tidak perlu lagi memilih role, karena role akan didapat dari database */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email">Email</label>
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
                  id="email"
                  type="email"
                  placeholder="masukkan email anda"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`form-input ${errors.email ? "error" : ""}`}
                  style={{ paddingLeft: "3rem" }}
                  required
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
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
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="masukkan password anda"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={`form-input ${errors.password ? "error" : ""}`}
                  style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
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
            
            {errors.general && (
              <div className="error-box">
                <p>{errors.general}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className="animate-spin" /> : "Masuk"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
              Belum punya akun?{" "}
              <Link
                href="/register"
                style={{ color: "var(--primary-green)", fontWeight: "500" }}
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}