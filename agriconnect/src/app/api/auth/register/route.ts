import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, location, password, role } =
      await request.json();

    if (!name || !email || !phone || !location || !password || !role) {
      return NextResponse.json(
        { success: false, message: "semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "password minimal 6 karakter" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "format email tidak valid" },
        { status: 400 }
      );
    }

    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "format nomor telepon tidak valid" },
        { status: 400 }
      );
    }

    // cek email sudah terdaftar
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "email atau nomor telepon sudah terdaftar" },
        { status: 400 }
      );
    }

    // mock user creation - in production, use proper password hashing
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      location,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false,
      ...(role === "FARMER" && {
        experience: 0,
        rating: 0,
        totalProjects: 0,
        verified: false,
      }),
      ...(role === "INVESTOR" && {
        totalInvestment: 0,
        totalReturn: 0,
      }),
    };

    return NextResponse.json({
      success: true,
      data: {
        user: newUser,
        message: "pendaftaran berhasil",
      },
      message: "pendaftaran berhasil, silakan login",
    });
  } catch (error) {
    console.error("register error:", error);
    return NextResponse.json(
      { success: false, message: "terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
