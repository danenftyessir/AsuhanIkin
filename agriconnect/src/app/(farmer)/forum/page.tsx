"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  TrendingUp,
  Users,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: "FARMER" | "INVESTOR";
    verified: boolean;
  };
  replies: number;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  trending: boolean;
}

export default function ForumPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "diskusi",
    tags: "",
  });

  useEffect(() => {
    loadForumPosts();
  }, [selectedCategory, sortBy]);

  const loadForumPosts = () => {
    const mockPosts: ForumPost[] = [
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
      {
        id: "4",
        title: "harga cabai turun drastis, bagaimana strategi petani?",
        content:
          "harga cabai di pasar sedang turun drastis. bagaimana strategi teman-teman petani cabai untuk menghadapi kondisi ini? ada yang beralih ke komoditas lain?",
        category: "ekonomi",
        author: {
          id: "farmer3",
          name: "ahmad suryadi",
          avatar: "https://i.pravatar.cc/150?u=ahmad",
          role: "FARMER",
          verified: true,
        },
        replies: 67,
        likes: 123,
        views: 834,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 45 * 60 * 1000),
        tags: ["cabai", "harga", "ekonomi", "strategi"],
        trending: true,
      },
    ];

    setPosts(mockPosts);
    setLoading(false);
  };

  const categories = [
    { key: "semua", label: "semua" },
    { key: "diskusi", label: "diskusi umum" },
    { key: "teknologi", label: "teknologi" },
    { key: "hama", label: "hama & penyakit" },
    { key: "investasi", label: "investasi" },
    { key: "ekonomi", label: "ekonomi" },
    { key: "tips", label: "tips & trik" },
  ];

  const sortOptions = [
    { key: "terbaru", label: "terbaru" },
    { key: "trending", label: "trending" },
    { key: "populer", label: "populer" },
    { key: "terlama", label: "terlama" },
  ];

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: ForumPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        author: {
          id: user?.id || "user1",
          name: user?.name || "user",
          avatar: user?.avatar || "https://i.pravatar.cc/150?u=user",
          role: (user?.role === "FARMER" || user?.role === "INVESTOR") ? user.role : "FARMER",
          verified: user?.verified || false,
        },
        replies: 0,
        likes: 0,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: newPost.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        trending: false,
      };

      setPosts((prev) => [post, ...prev]);
      setNewPost({ title: "", content: "", category: "diskusi", tags: "" });
      setShowCreatePost(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "semua" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "baru saja";
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 24 * 60)
      return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return `${Math.floor(diffInMinutes / (24 * 60))} hari lalu`;
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">forum diskusi</h1>
        <p className="page-subtitle">
          berbagi pengalaman dan knowledge dengan komunitas
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-value">{posts.length}</div>
          <div className="stat-label">total diskusi</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value">
            {posts.filter((p) => p.trending).length}
          </div>
          <div className="stat-label">trending</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">
            {posts.reduce((sum, p) => sum + p.replies, 0)}
          </div>
          <div className="stat-label">total balasan</div>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="card-header">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flex: 1,
            }}
          >
            <div style={{ flex: 1, position: "relative" }}>
              <Search
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
                type="text"
                placeholder="cari diskusi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "3rem" }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{ width: "auto" }}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus size={16} />
            buat diskusi
          </button>
        </div>

        <div className="filter-bar">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${
                selectedCategory === category.key ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div className="card" style={{ width: "100%", maxWidth: "600px" }}>
            <div className="card-header">
              <h3 className="card-title">buat diskusi baru</h3>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowCreatePost(false)}
              >
                tutup
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div className="input-group">
                <label>judul diskusi</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="form-input"
                  placeholder="masukkan judul diskusi..."
                />
              </div>

              <div className="input-group">
                <label>kategori</label>
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="form-input"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>konten</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="form-input"
                  placeholder="tulis konten diskusi..."
                  rows={6}
                />
              </div>

              <div className="input-group">
                <label>tags (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                  className="form-input"
                  placeholder="contoh: padi, hama, tips"
                />
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={handleCreatePost}
              >
                posting diskusi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {loading ? (
          <div className="card">
            <p>memuat diskusi...</p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <div key={post.id} className="card card-clickable">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="organic-badge"
                    style={{
                      backgroundColor:
                        post.category === "diskusi"
                          ? "var(--secondary-blue)"
                          : post.category === "teknologi"
                          ? "var(--primary-green)"
                          : post.category === "hama"
                          ? "var(--secondary-orange)"
                          : "var(--secondary-purple)",
                    }}
                  >
                    {post.category}
                  </span>
                  {post.trending && (
                    <span
                      style={{
                        background: "#ff6b6b",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                      }}
                    >
                      🔥 trending
                    </span>
                  )}
                </div>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                >
                  {formatTime(post.createdAt)}
                </span>
              </div>

              <h4
                style={{
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                {post.title}
              </h4>

              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  lineHeight: "1.5",
                }}
              >
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>

              {post.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: "var(--bg-light)",
                        color: "var(--text-light)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: `url(${post.author.avatar}) center/cover`,
                        backgroundColor: "var(--primary-green)",
                      }}
                    />
                    <div>
                      <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>
                        {post.author.name}
                      </span>
                      {post.author.verified && (
                        <span
                          style={{
                            color: "var(--primary-green)",
                            marginLeft: "0.25rem",
                          }}
                        >
                          ✓
                        </span>
                      )}
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-light)",
                        }}
                      >
                        {post.author.role === "FARMER" ? "petani" : "investor"}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "0.9rem",
                    color: "var(--text-light)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Eye size={14} />
                    <span>{post.views}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <MessageCircle size={14} />
                    <span>{post.replies}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Heart size={14} />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {sortedPosts.length === 0 && !loading && (
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Users
              size={48}
              style={{ color: "var(--text-light)", marginBottom: "1rem" }}
            />
            <h3>belum ada diskusi</h3>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              jadilah yang pertama memulai diskusi di kategori ini
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreatePost(true)}
            >
              <Plus size={16} />
              buat diskusi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
