"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Users, Star, Play } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  modules: number;
  rating: number;
  students: number;
  instructor: string;
  image: string;
  progress: number;
  enrolled: boolean;
}

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: 1,
        title: "Teknik Budidaya Cabai Modern",
        description:
          "Pelajari teknik budidaya cabai dengan teknologi terkini untuk hasil maksimal.",
        category: "budidaya",
        level: "Pemula",
        duration: 8,
        modules: 12,
        rating: 4.9,
        students: 1250,
        instructor: "Dr. Agus Pertanian",
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300",
        progress: 75,
        enrolled: true,
      },
      {
        id: 2,
        title: "Manajemen Hama Terpadu",
        description:
          "Strategi pengendalian hama yang efektif dan ramah lingkungan.",
        category: "perlindungan",
        level: "Menengah",
        duration: 6,
        modules: 8,
        rating: 4.8,
        students: 890,
        instructor: "Prof. Siti Hama",
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300",
        progress: 0,
        enrolled: false,
      },
      {
        id: 3,
        title: "Hidroponik untuk Pemula",
        description:
          "Panduan lengkap memulai budidaya hidroponik dari nol hingga panen.",
        category: "teknologi",
        level: "Pemula",
        duration: 10,
        modules: 15,
        rating: 4.7,
        students: 2100,
        instructor: "Ir. Bambang Hidro",
        image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300",
        progress: 0,
        enrolled: false,
      },
      {
        id: 4,
        title: "Pemasaran Digital Produk Pertanian",
        description:
          "Strategi pemasaran online untuk meningkatkan penjualan hasil pertanian.",
        category: "bisnis",
        level: "Menengah",
        duration: 5,
        modules: 10,
        rating: 4.6,
        students: 450,
        instructor: "Drs. Marketing Pro",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300",
        progress: 0,
        enrolled: false,
      },
      {
        id: 5,
        title: "Sistem Irigasi Modern",
        description:
          "Teknologi irigasi efisien untuk menghemat air dan meningkatkan produktivitas.",
        category: "teknologi",
        level: "Lanjutan",
        duration: 7,
        modules: 9,
        rating: 4.8,
        students: 320,
        instructor: "Ir. Water Tech",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300",
        progress: 0,
        enrolled: false,
      },
      {
        id: 6,
        title: "Pengelolaan Keuangan Usaha Tani",
        description:
          "Manajemen keuangan yang tepat untuk kesuksesan usaha pertanian.",
        category: "bisnis",
        level: "Pemula",
        duration: 4,
        modules: 6,
        rating: 4.5,
        students: 680,
        instructor: "Ak. Finance Expert",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300",
        progress: 0,
        enrolled: false,
      },
    ];

    setCourses(mockCourses);
  }, []);

  const categories = [
    { key: "semua", label: "Semua Kategori" },
    { key: "budidaya", label: "Budidaya" },
    { key: "perlindungan", label: "Perlindungan" },
    { key: "teknologi", label: "Teknologi" },
    { key: "bisnis", label: "Bisnis" },
  ];

  const filteredCourses =
    selectedCategory === "semua"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handleEnrollCourse = (courseId: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: true, progress: 0 }
          : course
      )
    );
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Pusat Pembelajaran</h1>
        <p className="page-subtitle">Tingkatkan keahlian pertanian Anda</p>
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

      <div className="grid grid-2">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={160}
              className="course-image"
            />
            <div className="course-content">
              <div className="course-category">{course.category}</div>
              <h4 className="course-title">{course.title}</h4>
              <p className="course-description">{course.description}</p>

              <div className="course-meta">
                <div className="course-rating">
                  <Star className="star" size={16} fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
                <div className="course-students">
                  <Users size={16} />
                  <span>{course.students} siswa</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  color: "var(--text-light)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Clock size={16} />
                  <span>{course.duration} jam</span>
                </div>
                <span>{course.modules} modul</span>
                <span>{course.level}</span>
              </div>

              <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--text-light)" }}>Instruktur: </span>
                <span style={{ fontWeight: 500 }}>{course.instructor}</span>
              </div>

              {course.enrolled && course.progress > 0 && (
                <div className="course-progress">
                  <div className="course-progress-label">
                    Progress: {course.progress}%
                  </div>
                  <div className="course-progress-bar">
                    <div
                      className="course-progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                className={`btn ${
                  course.enrolled ? "btn-primary" : "btn-outline"
                } btn-full`}
                onClick={() =>
                  course.enrolled ? null : handleEnrollCourse(course.id)
                }
              >
                {course.enrolled ? (
                  <>
                    <Play size={16} />
                    {course.progress > 0
                      ? "Lanjutkan Belajar"
                      : "Mulai Belajar"}
                  </>
                ) : (
                  "Daftar Kelas"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💡 Tips Pembelajaran</h3>
        </div>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <ul style={{ marginLeft: "1rem" }}>
            <li>Ikuti kelas secara berurutan untuk pemahaman yang maksimal</li>
            <li>Praktikkan langsung di lahan untuk mengasah keterampilan</li>
            <li>Bergabunglah dengan forum diskusi untuk berbagi pengalaman</li>
            <li>Manfaatkan materi unduhan untuk referensi offline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
