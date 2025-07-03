"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Heart,
  Brain,
  Shield,
  Users,
  MessageCircle,
  Plus,
} from "lucide-react";

interface NutritionArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: number;
  likes: number;
  author: string;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  replies: number;
  likes: number;
  createdAt: Date;
}

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("nutrisi");
  const [articles, setArticles] = useState<NutritionArticle[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    loadEducationContent();
    loadForumPosts();
  }, []);

  const loadEducationContent = () => {
    const mockArticles: NutritionArticle[] = [
      {
        id: "1",
        title: "manfaat vitamin c dalam sayuran hijau",
        description:
          "pelajari pentingnya vitamin c untuk sistem imun dan sumber terbaik dari sayuran hijau",
        category: "vitamin",
        image:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300",
        readTime: 5,
        likes: 234,
        author: "dr. nutrisi",
      },
      {
        id: "2",
        title: "antioksidan alami dalam buah-buahan",
        description:
          "temukan kekuatan antioksidan untuk melawan radikal bebas dan menjaga kesehatan",
        category: "antioksidan",
        image:
          "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300",
        readTime: 7,
        likes: 189,
        author: "prof. kesehatan",
      },
      {
        id: "3",
        title: "protein nabati vs hewani",
        description:
          "perbandingan lengkap protein dari tanaman dan hewan untuk kebutuhan harian",
        category: "protein",
        image:
          "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300",
        readTime: 8,
        likes: 156,
        author: "ahli gizi",
      },
      {
        id: "4",
        title: "serat untuk pencernaan sehat",
        description:
          "mengapa serat penting untuk kesehatan pencernaan dan sumber terbaik dari sayuran",
        category: "serat",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
        readTime: 6,
        likes: 201,
        author: "dr. pencernaan",
      },
      {
        id: "5",
        title: "mineral penting dari bumi",
        description:
          "eksplorasi mineral essensial yang dibutuhkan tubuh dari hasil pertanian",
        category: "mineral",
        image:
          "https://images.unsplash.com/photo-1610832745743-e3f13beb4fab?w=300",
        readTime: 9,
        likes: 178,
        author: "peneliti mineral",
      },
      {
        id: "6",
        title: "makanan super untuk kesehatan optimal",
        description:
          "daftar lengkap superfood yang mudah ditemukan dan manfaatnya",
        category: "superfood",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300",
        readTime: 10,
        likes: 267,
        author: "chef nutrisi",
      },
    ];

    setArticles(mockArticles);
  };

  const loadForumPosts = () => {
    const mockPosts: ForumPost[] = [
      {
        id: "1",
        title: "tips menanam sayuran organik di rumah",
        content:
          "bagaimana cara terbaik untuk memulai berkebun organik di halaman rumah yang terbatas?",
        author: "gardener_pemula",
        replies: 23,
        likes: 45,
        createdAt: new Date("2025-07-03"),
      },
      {
        id: "2",
        title: "pengalaman investasi pertanian pertama",
        content:
          "sharing pengalaman pertama kali invest di sektor pertanian dan tips untuk pemula",
        author: "investor_baru",
        replies: 18,
        likes: 32,
        createdAt: new Date("2025-07-02"),
      },
      {
        id: "3",
        title: "resep sehat dengan bahan organik",
        content: "kumpulan resep makanan sehat menggunakan bahan organik segar",
        author: "chef_sehat",
        replies: 56,
        likes: 89,
        createdAt: new Date("2025-07-01"),
      },
    ];

    setForumPosts(mockPosts);
  };

  const categories = [
    { key: "semua", label: "semua" },
    { key: "vitamin", label: "vitamin" },
    { key: "antioksidan", label: "antioksidan" },
    { key: "protein", label: "protein" },
    { key: "serat", label: "serat" },
    { key: "mineral", label: "mineral" },
    { key: "superfood", label: "superfood" },
  ];

  const filteredArticles =
    selectedCategory === "semua"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const tabs = [
    { key: "nutrisi", label: "nutrisi & kesehatan", icon: Heart },
    { key: "forum", label: "forum diskusi", icon: MessageCircle },
  ];

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">pusat edukasi</h1>
        <p className="page-subtitle">
          pelajari nutrisi dan kesehatan dari pangan
        </p>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`btn ${
                activeTab === tab.key ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "nutrisi" && (
        <>
          <div className="card">
            <h3 className="card-title">filter artikel</h3>
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

          <div className="grid grid-2">
            {filteredArticles.map((article) => (
              <div key={article.id} className="card card-clickable">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={150}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    className="organic-badge"
                    style={{ backgroundColor: "var(--light-green)" }}
                  >
                    {article.category}
                  </span>
                  <span
                    style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                  >
                    {article.readTime} min baca
                  </span>
                </div>
                <h4 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>
                  {article.title}
                </h4>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {article.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    color: "var(--text-light)",
                  }}
                >
                  <span>oleh {article.author}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Heart size={14} />
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "forum" && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">diskusi komunitas</h3>
              <button className="btn btn-primary btn-sm">
                <Plus size={16} />
                buat topik
              </button>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {forumPosts.map((post) => (
              <div key={post.id} className="card card-clickable">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4 style={{ fontWeight: "600" }}>{post.title}</h4>
                  <span
                    style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                  >
                    {post.createdAt.toLocaleDateString("id-ID")}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {post.content}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    color: "var(--text-light)",
                  }}
                >
                  <span>oleh {post.author}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
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
            ))}
          </div>
        </>
      )}

      <div className="card">
        <h3 className="card-title">tips sehat hari ini</h3>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Brain size={20} color="var(--primary-green)" />
            <strong>tahukah anda?</strong>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
            konsumsi 5 porsi sayuran dan buah setiap hari dapat menurunkan
            risiko penyakit jantung hingga 20% dan meningkatkan daya tahan tubuh
          </p>
        </div>
      </div>
    </div>
  );
}
