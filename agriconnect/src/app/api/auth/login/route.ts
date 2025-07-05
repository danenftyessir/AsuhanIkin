import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fungsi untuk mengonversi nilai Decimal menjadi string
function stringifyDecimalFields(user: any) {
    if (user.totalInvestment) {
        user.totalInvestment = user.totalInvestment.toString();
    }
    if (user.totalReturn) {
        user.totalReturn = user.totalReturn.toString();
    }
    return user;
}


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET || "agriconnect-jwt-secret-key-2024",
      {
        expiresIn: "1d",
      }
    );
    
    const { password: _, ...userWithoutPassword } = user;

    // Konversi field Decimal ke string sebelum mengirim respons
    const serializableUser = stringifyDecimalFields(userWithoutPassword);

    return NextResponse.json({
      success: true,
      data: {
        user: serializableUser,
        token,
      },
      message: "Login berhasil",
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}