import { useState, useEffect } from "react";
import { User } from "@/types"; // Pastikan path ini benar

// Definisikan tipe untuk state autentikasi agar lebih jelas
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Definisikan tipe untuk respons dari API login
interface LoginResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true, // Set loading ke true saat pertama kali hook dijalankan
  });

  // useEffect untuk memeriksa status login saat aplikasi pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("agri-token");
    const userStr = localStorage.getItem("agri-user");

    if (token && userStr) {
      try {
        const user: User = JSON.parse(userStr);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        // Jika data di local storage tidak valid, hapus
        localStorage.removeItem("agri-token");
        localStorage.removeItem("agri-user");
        setAuthState({ user: null, token: null, isAuthenticated: false, loading: false });
      }
    } else {
      setAuthState({ user: null, token: null, isAuthenticated: false, loading: false });
    }
  }, []);

  // Fungsi login yang akan dipanggil dari halaman login
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.data) {
        // Simpan token dan data user ke local storage
        localStorage.setItem("agri-token", data.data.token);
        localStorage.setItem("agri-user", JSON.stringify(data.data.user));

        // Update state autentikasi
        setAuthState({
          user: data.data.user,
          token: data.data.token,
          isAuthenticated: true,
          loading: false,
        });
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login gagal" };
      }
    } catch (error) {
      console.error("Login hook error:", error);
      return { success: false, message: "Terjadi kesalahan pada jaringan" };
    }
  };

  // Fungsi logout
  const logout = () => {
    localStorage.removeItem("agri-token");
    localStorage.removeItem("agri-user");
    setAuthState({ user: null, token: null, isAuthenticated: false, loading: false });
  };

  return { ...authState, login, logout };
};