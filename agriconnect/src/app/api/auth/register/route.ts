import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client"; // Import enum dari Prisma

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, location, password, role } = await request.json();

    // Validasi input dasar
    if (!name || !email || !phone || !location || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah peran yang diinput valid
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { success: false, message: "Peran tidak valid" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        location,
        role, // Sekarang menggunakan enum UserRole
        // Field lain akan menggunakan nilai default dari skema
      },
    });

    // Hapus password dari objek user sebelum dikirim sebagai respons
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: "Pendaftaran berhasil",
    });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}