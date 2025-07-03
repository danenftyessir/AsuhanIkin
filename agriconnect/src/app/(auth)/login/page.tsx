"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff, Mail, Lock, User, Truck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
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
      newErrors.email = "email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "format email tidak valid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(
        formData.email,
        formData.password,
        selectedRole
      );

      if (result.success) {
        if (selectedRole === "FARMER") {
          router.push("/farmer-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setErrors({ general: result.message || "login gagal" });
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
            masuk akun
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-light)",
              marginBottom: "2rem",
            }}
          >
            selamat datang kembali di platform pertanian
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <input type="checkbox" />
                ingat saya
              </label>
              <Link
                href="/forgot-password"
                style={{ color: "var(--primary-green)", fontSize: "0.9rem" }}
              >
                lupa password?
              </Link>
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
              {loading ? "masuk..." : "masuk"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
              belum punya akun?{" "}
              <Link
                href="/register"
                style={{ color: "var(--primary-green)", fontWeight: "500" }}
              >
                daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{ maxWidth: "400px", width: "100%", marginTop: "1rem" }}
        >
          <h4 style={{ marginBottom: "1rem" }}>akun demo</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <div>
              <strong>investor:</strong> investor@test.com / password
            </div>
            <div>
              <strong>petani:</strong> farmer@test.com / password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
