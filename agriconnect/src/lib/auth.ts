import { User } from "@/types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const getStoredAuth = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      isAuthenticated: false,
      token: null,
    };
  }

  const stored = localStorage.getItem("auth");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {
        user: null,
        isAuthenticated: false,
        token: null,
      };
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    token: null,
  };
};

export const storeAuth = (auth: AuthState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
};

export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth");
  }
};

export const mockLogin = (
  email: string,
  password: string,
  role: "INVESTOR" | "FARMER"
): Promise<AuthState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: "1",
        email,
        name: role === "INVESTOR" ? "Sarah Investor" : "Ahmad Suryadi",
        role,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        phone: "+62812345678",
        location: role === "INVESTOR" ? "Jakarta" : "Boyolali, Jawa Tengah",
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(role === "FARMER" && {
          experience: 15,
          rating: 4.9,
          totalProjects: 12,
          verified: true,
        }),
        ...(role === "INVESTOR" && {
          totalInvestment: 25000000,
          totalReturn: 3125000,
        }),
      };

      const auth: AuthState = {
        user,
        isAuthenticated: true,
        token: "mock-jwt-token",
      };

      resolve(auth);
    }, 1000);
  });
};
