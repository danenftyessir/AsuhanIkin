import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // mock investment data
    const mockInvestments = [
      {
        id: "1",
        title: "Cabai Merah Premium",
        description:
          "Proyek penanaman cabai merah dengan sistem IoT monitoring. Varietas unggul dengan produktivitas tinggi dan tahan hama.",
        location: "Boyolali, Jawa Tengah",
        roi: 18,
        duration: 6,
        minInvest: 1000000,
        target: 50000000,
        collected: 32000000,
        status: "FUNDING",
        category: "sayuran",
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-1",
        farmer: {
          id: "farmer-1",
          name: "Ahmad Suryadi",
          email: "ahmad@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=ahmad",
          location: "Boyolali, Jawa Tengah",
          experience: 15,
          rating: 4.9,
          totalProjects: 12,
          verified: true,
        },
        investors: [
          {
            id: "inv-1",
            amount: 2000000,
            user: {
              id: "user-1",
              name: "Sarah Investor",
              avatar: "https://i.pravatar.cc/150?u=sarah",
            },
          },
        ],
        iotData: [
          {
            id: "iot-1",
            temperature: 28.5,
            humidity: 75,
            soilPh: 6.8,
            nutrients: 85,
            timestamp: new Date(),
          },
        ],
      },
      {
        id: "2",
        title: "Jagung Manis Organik",
        description:
          "Budidaya jagung manis organik dengan metode ramah lingkungan. Hasil panen dijamin berkualitas premium.",
        location: "Lampung Timur",
        roi: 15,
        duration: 4,
        minInvest: 500000,
        target: 25000000,
        collected: 18000000,
        status: "PLANTING",
        category: "sayuran",
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=600",
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-2",
        farmer: {
          id: "farmer-2",
          name: "Siti Rahayu",
          email: "siti@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=siti",
          location: "Lampung Timur",
          experience: 10,
          rating: 4.8,
          totalProjects: 8,
          verified: true,
        },
        investors: [],
        iotData: [],
      },
      {
        id: "3",
        title: "Tomat Cherry Hidroponik",
        description:
          "Teknologi hidroponik modern untuk menghasilkan tomat cherry berkualitas tinggi. Sistem otomatis untuk hasil optimal.",
        location: "Cianjur, Jawa Barat",
        roi: 22,
        duration: 3,
        minInvest: 2000000,
        target: 15000000,
        collected: 5000000,
        status: "FUNDING",
        category: "sayuran",
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-3",
        farmer: {
          id: "farmer-3",
          name: "Budi Hartono",
          email: "budi@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=budi",
          location: "Cianjur, Jawa Barat",
          experience: 12,
          rating: 4.7,
          totalProjects: 15,
          verified: true,
        },
        investors: [],
        iotData: [],
      },
    ];

    // filter by status if provided
    let filteredInvestments = mockInvestments;
    if (status && status !== "all") {
      filteredInvestments = mockInvestments.filter(
        (inv) => inv.status === status.toUpperCase()
      );
    }

    // calculate pagination
    const total = filteredInvestments.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedInvestments = filteredInvestments.slice(skip, skip + limit);

    // add calculated fields
    const investmentsWithCalculations = paginatedInvestments.map((inv) => ({
      ...inv,
      progress: Math.round((inv.collected / inv.target) * 100),
      investorsCount: inv.investors.length,
      daysLeft: Math.max(
        0,
        Math.ceil(
          (new Date(inv.createdAt).getTime() +
            inv.duration * 30 * 24 * 60 * 60 * 1000 -
            Date.now()) /
            (24 * 60 * 60 * 1000)
        )
      ),
    }));

    return NextResponse.json({
      success: true,
      data: investmentsWithCalculations,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get investments error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      location,
      roi,
      duration,
      minInvest,
      target,
      category,
      image,
    } = body;

    // validate required fields
    if (
      !title ||
      !description ||
      !location ||
      !roi ||
      !duration ||
      !minInvest ||
      !target ||
      !category
    ) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // mock create investment
    const newInvestment = {
      id: `inv-${Date.now()}`,
      title,
      description,
      location,
      roi,
      duration,
      minInvest,
      target,
      collected: 0,
      status: "FUNDING",
      category,
      image:
        image ||
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
      createdAt: new Date(),
      updatedAt: new Date(),
      farmerId: "current-farmer-id", // in real app, get from auth
    };

    return NextResponse.json({
      success: true,
      data: newInvestment,
      message: "Proyek investasi berhasil dibuat",
    });
  } catch (error) {
    console.error("Create investment error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
