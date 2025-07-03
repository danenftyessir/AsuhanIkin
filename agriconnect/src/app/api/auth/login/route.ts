import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    // validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Email, password, dan role wajib diisi" },
        { status: 400 }
      );
    }

    // mock authentication - in production, use proper password hashing
    const validCredentials = [
      { email: "investor@test.com", password: "password", role: "INVESTOR" },
      { email: "farmer@test.com", password: "password", role: "FARMER" },
      { email: "admin@test.com", password: "password", role: "ADMIN" },
    ];

    const user = validCredentials.find(
      (cred) =>
        cred.email === email && cred.password === password && cred.role === role
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email, password, atau role tidak valid" },
        { status: 401 }
      );
    }

    // simulate database user lookup
    const userData = {
      id: "1",
      email: user.email,
      name:
        user.role === "INVESTOR"
          ? "Sarah Investor"
          : user.role === "FARMER"
          ? "Ahmad Suryadi"
          : "Admin User",
      role: user.role,
      avatar: `https://i.pravatar.cc/150?u=${user.email}`,
      phone: "+62812345678",
      location:
        user.role === "INVESTOR"
          ? "Jakarta"
          : user.role === "FARMER"
          ? "Boyolali, Jawa Tengah"
          : "Jakarta",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(user.role === "FARMER" && {
        experience: 15,
        rating: 4.9,
        totalProjects: 12,
        verified: true,
      }),
      ...(user.role === "INVESTOR" && {
        totalInvestment: 25000000,
        totalReturn: 3125000,
      }),
    };

    // create mock JWT token
    const token = `mock-jwt-token-${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
        token,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      },
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
