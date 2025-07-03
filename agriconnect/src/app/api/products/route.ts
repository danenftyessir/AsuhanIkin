import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    // mock product data
    const mockProducts = [
      {
        id: "101",
        name: "Cabai Merah Segar",
        description:
          "Cabai merah segar hasil panen langsung dari kebun. Kualitas premium dengan rasa pedas yang pas.",
        price: 35000,
        unit: "kg",
        category: "sayuran",
        stock: 50,
        image:
          "https://images.unsplash.com/photo-1583258292688-d0213dc5252c?w=400",
        organic: true,
        harvestDate: new Date("2025-07-01"),
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
          rating: 4.9,
          verified: true,
        },
        reviews: [
          {
            id: "rev-1",
            rating: 5,
            comment: "Cabai segar dan pedas sesuai ekspektasi",
            user: {
              id: "user-1",
              name: "Sarah Investor",
              avatar: "https://i.pravatar.cc/150?u=sarah",
            },
            createdAt: new Date(),
          },
        ],
        averageRating: 4.8,
        totalReviews: 24,
      },
      {
        id: "102",
        name: "Jagung Manis",
        description:
          "Jagung manis organik dengan rasa yang lezat dan manis alami. Bebas pestisida kimia.",
        price: 12000,
        unit: "kg",
        category: "sayuran",
        stock: 100,
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
        organic: true,
        harvestDate: new Date("2025-06-28"),
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
          rating: 4.8,
          verified: true,
        },
        reviews: [],
        averageRating: 4.9,
        totalReviews: 18,
      },
      {
        id: "103",
        name: "Tomat Cherry Premium",
        description:
          "Tomat cherry hidroponik dengan rasa manis dan tekstur renyah. Kaya vitamin dan antioksidan.",
        price: 25000,
        unit: "500g",
        category: "sayuran",
        stock: 30,
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        organic: false,
        harvestDate: new Date("2025-06-30"),
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
          rating: 4.7,
          verified: true,
        },
        reviews: [],
        averageRating: 4.7,
        totalReviews: 12,
      },
      {
        id: "104",
        name: "Bawang Merah Brebes",
        description:
          "Bawang merah asli Brebes dengan aroma khas dan rasa yang tajam. Cocok untuk bumbu masakan.",
        price: 28000,
        unit: "kg",
        category: "rempah",
        stock: 75,
        image:
          "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
        organic: true,
        harvestDate: new Date("2025-06-25"),
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-4",
        farmer: {
          id: "farmer-4",
          name: "Joko Santoso",
          email: "joko@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=joko",
          location: "Brebes, Jawa Tengah",
          rating: 4.6,
          verified: true,
        },
        reviews: [],
        averageRating: 4.6,
        totalReviews: 31,
      },
      {
        id: "105",
        name: "Apel Manalagi",
        description:
          "Apel manalagi segar langsung dari kebun pegunungan. Rasa manis dan tekstur renyah.",
        price: 40000,
        unit: "kg",
        category: "buah",
        stock: 25,
        image:
          "https://images.unsplash.com/photo-1560806887-1e4cd0b69665?w=400",
        organic: false,
        harvestDate: new Date("2025-06-20"),
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-5",
        farmer: {
          id: "farmer-5",
          name: "Wayan Suta",
          email: "wayan@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=wayan",
          location: "Malang, Jawa Timur",
          rating: 4.5,
          verified: true,
        },
        reviews: [],
        averageRating: 4.5,
        totalReviews: 8,
      },
      {
        id: "106",
        name: "Beras Organik",
        description:
          "Beras organik kualitas premium. Proses tanam tanpa pestisida kimia, aman untuk keluarga.",
        price: 18000,
        unit: "kg",
        category: "beras",
        stock: 200,
        image:
          "https://images.unsplash.com/photo-1586201375765-c128505293de?w=400",
        organic: true,
        harvestDate: new Date("2025-06-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
        farmerId: "farmer-6",
        farmer: {
          id: "farmer-6",
          name: "Suparno",
          email: "suparno@test.com",
          role: "FARMER",
          avatar: "https://i.pravatar.cc/150?u=suparno",
          location: "Karawang, Jawa Barat",
          rating: 4.8,
          verified: true,
        },
        reviews: [],
        averageRating: 4.8,
        totalReviews: 45,
      },
    ];

    // filter by category if provided
    let filteredProducts = mockProducts;
    if (category && category !== "semua") {
      filteredProducts = mockProducts.filter(
        (product) => product.category === category
      );
    }

    // filter by search if provided
    if (search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // calculate pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
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
    console.error("Get products error:", error);
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
      name,
      description,
      price,
      unit,
      category,
      stock,
      image,
      organic,
      harvestDate,
    } = body;

    // validate required fields
    if (!name || !description || !price || !unit || !category || !stock) {
      return NextResponse.json(
        { success: false, message: "Field wajib tidak boleh kosong" },
        { status: 400 }
      );
    }

    // validate price and stock
    if (price <= 0 || stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Harga harus lebih dari 0 dan stok tidak boleh negatif",
        },
        { status: 400 }
      );
    }

    // mock create product
    const newProduct = {
      id: `prod-${Date.now()}`,
      name,
      description,
      price: parseInt(price),
      unit,
      category,
      stock: parseInt(stock),
      image:
        image ||
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400",
      organic: organic || false,
      harvestDate: harvestDate ? new Date(harvestDate) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      farmerId: "current-farmer-id", // in real app, get from auth
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Produk berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
