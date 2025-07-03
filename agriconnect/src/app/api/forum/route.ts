import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "terbaru";
    const skip = (page - 1) * limit;

    const mockPosts = [
      {
        id: "1",
        title: "tips mengatasi hama wereng pada padi",
        content:
          "ada yang punya pengalaman mengatasi hama wereng? di sawah saya mulai muncul tanda-tanda serangan. mohon sharing tips efektif untuk pengendaliannya",
        category: "hama",
        author: {
          id: "farmer1",
          name: "budi santoso",
          avatar: "https://i.pravatar.cc/150?u=budi",
          role: "FARMER",
          verified: true,
        },
        replies: 23,
        likes: 45,
        views: 234,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
        tags: ["padi", "hama", "wereng", "pengendalian"],
        trending: true,
      },
      {
        id: "2",
        title: "pengalaman investasi pertanian pertama kali",
        content:
          "halo semua! saya investor pemula yang baru pertama kali berinvestasi di sektor pertanian. ingin sharing pengalaman dan bertanya tips untuk memilih petani yang tepat",
        category: "investasi",
        author: {
          id: "investor1",
          name: "sarah investor",
          avatar: "https://i.pravatar.cc/150?u=sarah",
          role: "INVESTOR",
          verified: true,
        },
        replies: 18,
        likes: 32,
        views: 156,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        tags: ["investasi", "pemula", "tips", "petani"],
        trending: false,
      },
      {
        id: "3",
        title: "hidroponik untuk pemula - sharing pengalaman",
        content:
          "sudah 6 bulan menjalankan sistem hidroponik di rumah. mau share pengalaman dan tips untuk teman-teman yang ingin memulai. dari media tanam sampai nutrisi",
        category: "teknologi",
        author: {
          id: "farmer2",
          name: "siti rahayu",
          avatar: "https://i.pravatar.cc/150?u=siti",
          role: "FARMER",
          verified: true,
        },
        replies: 56,
        likes: 89,
        views: 567,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 60 * 1000),
        tags: ["hidroponik", "pemula", "teknologi", "tips"],
        trending: true,
      },
    ];

    let filteredPosts = mockPosts;

    if (category && category !== "semua") {
      filteredPosts = mockPosts.filter((post) => post.category === category);
    }

    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return b.trending ? 1 : -1;
        case "populer":
          return b.likes + b.replies - (a.likes + a.replies);
        case "terlama":
          return a.createdAt.getTime() - b.createdAt.getTime();
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    const total = sortedPosts.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedPosts,
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
    console.error("get forum posts error:", error);
    return NextResponse.json(
      { success: false, message: "terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, tags } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, message: "judul, konten, dan kategori wajib diisi" },
        { status: 400 }
      );
    }

    const newPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      category,
      author: {
        id: "current-user-id",
        name: "current user",
        avatar: "https://i.pravatar.cc/150?u=current",
        role: "FARMER",
        verified: false,
      },
      replies: 0,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tags
        ? tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [],
      trending: false,
    };

    return NextResponse.json({
      success: true,
      data: newPost,
      message: "diskusi berhasil dibuat",
    });
  } catch (error) {
    console.error("create forum post error:", error);
    return NextResponse.json(
      { success: false, message: "terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
