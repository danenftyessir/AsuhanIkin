"use client";

import { useState, useEffect } from "react";

interface NutritionData {
  name: string;
  icon: string;
  calories: number;
  vitaminC?: number;
  fiber?: number;
  lycopene?: number;
  quercetin?: string;
  benefits: string[];
  description: string;
  nutrients: {
    protein?: number;
    carbs?: number;
    fat?: number;
    calcium?: number;
    iron?: number;
    potassium?: number;
  };
}

export default function EducationPage() {
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    const mockNutritionData: NutritionData[] = [
      {
        name: "Cabai Merah",
        icon: "🌶️",
        calories: 21,
        vitaminC: 318,
        benefits: ["Antioksidan Tinggi", "Boost Imun", "Anti Inflamasi"],
        description:
          "Kaya vitamin C dan capsaicin yang baik untuk kesehatan jantung dan metabolisme.",
        nutrients: {
          protein: 1.9,
          carbs: 4.3,
          fat: 0.4,
          calcium: 20,
          iron: 1.2,
          potassium: 340,
        },
      },
      {
        name: "Jagung Manis",
        icon: "🌽",
        calories: 86,
        fiber: 2.7,
        benefits: ["Energi", "Serat Tinggi", "Vitamin B"],
        description:
          "Sumber karbohidrat sehat dengan serat yang baik untuk pencernaan.",
        nutrients: {
          protein: 3.2,
          carbs: 19.0,
          fat: 1.2,
          calcium: 2,
          iron: 0.5,
          potassium: 270,
        },
      },
      {
        name: "Tomat",
        icon: "🍅",
        calories: 18,
        lycopene: 2573,
        benefits: ["Likopen", "Vitamin K", "Kalium"],
        description:
          "Mengandung likopen yang tinggi, antioksidan kuat untuk kesehatan kulit dan jantung.",
        nutrients: {
          protein: 0.9,
          carbs: 3.9,
          fat: 0.2,
          calcium: 10,
          iron: 0.3,
          potassium: 237,
        },
      },
      {
        name: "Bawang Merah",
        icon: "🧅",
        calories: 40,
        quercetin: "Tinggi",
        benefits: ["Antibakteri", "Antioksidan", "Kolesterol"],
        description:
          "Kaya quercetin dan sulfur yang membantu menurunkan kolesterol dan tekanan darah.",
        nutrients: {
          protein: 1.1,
          carbs: 9.3,
          fat: 0.1,
          calcium: 23,
          iron: 0.2,
          potassium: 146,
        },
      },
      {
        name: "Apel",
        icon: "🍎",
        calories: 52,
        fiber: 2.4,
        benefits: ["Serat", "Antioksidan", "Pektin"],
        description:
          "Mengandung pektin yang baik untuk pencernaan dan mengontrol kadar gula darah.",
        nutrients: {
          protein: 0.3,
          carbs: 13.8,
          fat: 0.2,
          calcium: 6,
          iron: 0.1,
          potassium: 107,
        },
      },
      {
        name: "Beras Merah",
        icon: "🍚",
        calories: 111,
        fiber: 1.8,
        benefits: ["Serat", "Vitamin B", "Magnesium"],
        description:
          "Beras utuh yang kaya serat dan vitamin B kompleks untuk kesehatan pencernaan.",
        nutrients: {
          protein: 2.3,
          carbs: 22.0,
          fat: 0.9,
          calcium: 23,
          iron: 1.5,
          potassium: 86,
        },
      },
    ];

    setNutritionData(mockNutritionData);
  }, []);

  const categories = [
    { key: "semua", label: "Semua" },
    { key: "sayuran", label: "Sayuran" },
    { key: "buah", label: "Buah" },
    { key: "biji", label: "Biji-bijian" },
  ];

  const getCategoryFromName = (name: string) => {
    if (
      ["Cabai Merah", "Jagung Manis", "Tomat", "Bawang Merah"].includes(name)
    ) {
      return "sayuran";
    } else if (["Apel"].includes(name)) {
      return "buah";
    } else if (["Beras Merah"].includes(name)) {
      return "biji";
    }
    return "semua";
  };

  const filteredData =
    selectedCategory === "semua"
      ? nutritionData
      : nutritionData.filter(
          (item) => getCategoryFromName(item.name) === selectedCategory
        );

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Edukasi Nutrisi</h1>
        <p className="page-subtitle">
          Pelajari manfaat nutrisi dari berbagai produk pertanian
        </p>
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

      <div className="card">
        <h3 className="card-title">Katalog Nutrisi Pangan</h3>
        <div className="grid grid-2">
          {filteredData.map((item, index) => (
            <div key={index} className="card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ fontSize: "3rem" }}>{item.icon}</div>
                <div>
                  <h4 style={{ marginBottom: "0.5rem" }}>{item.name}</h4>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    background: "var(--bg-light)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--primary-green)",
                    }}
                  >
                    {item.calories}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                    }}
                  >
                    Kalori/100g
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    background: "var(--bg-light)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--secondary-blue)",
                    }}
                  >
                    {item.vitaminC ||
                      item.fiber ||
                      item.lycopene ||
                      item.quercetin}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                    }}
                  >
                    {item.vitaminC
                      ? "Vit C mg"
                      : item.fiber
                      ? "Serat g"
                      : item.lycopene
                      ? "Likopen μg"
                      : "Quercetin"}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    background: "var(--bg-light)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--secondary-orange)",
                    }}
                  >
                    High
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                    }}
                  >
                    Antioksidan
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                {item.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    style={{
                      background: "var(--light-green)",
                      color: "var(--primary-green)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              <div
                style={{
                  background: "var(--bg-light)",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <h5 style={{ marginBottom: "0.5rem" }}>
                  Komposisi Nutrisi (per 100g):
                </h5>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                  }}
                >
                  {item.nutrients.protein && (
                    <div>Protein: {item.nutrients.protein}g</div>
                  )}
                  {item.nutrients.carbs && (
                    <div>Karbohidrat: {item.nutrients.carbs}g</div>
                  )}
                  {item.nutrients.fat && (
                    <div>Lemak: {item.nutrients.fat}g</div>
                  )}
                  {item.nutrients.calcium && (
                    <div>Kalsium: {item.nutrients.calcium}mg</div>
                  )}
                  {item.nutrients.iron && (
                    <div>Zat Besi: {item.nutrients.iron}mg</div>
                  )}
                  {item.nutrients.potassium && (
                    <div>Kalium: {item.nutrients.potassium}mg</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">💡 Tips Kesehatan</h3>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <ul style={{ marginLeft: "1rem" }}>
            <li>Kombinasikan sayuran warna-warni untuk nutrisi lengkap</li>
            <li>Konsumsi minimal 5 porsi buah dan sayur per hari</li>
            <li>Pilih produk organik untuk mengurangi pestisida</li>
            <li>Variasikan jenis protein nabati dan hewani</li>
            <li>Proses masak dengan cara yang mempertahankan nutrisi</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">🥗 Rekomendasi Menu Sehat</h3>
        <div className="grid grid-2">
          <div
            style={{
              background: "var(--bg-light)",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "0.5rem" }}>Sarapan Sehat</h4>
            <ul style={{ fontSize: "0.9rem", marginLeft: "1rem" }}>
              <li>Beras merah + telur + sayuran hijau</li>
              <li>Jus tomat segar dengan apel</li>
              <li>Sambal bawang merah untuk rasa</li>
            </ul>
          </div>
          <div
            style={{
              background: "var(--bg-light)",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "0.5rem" }}>Makan Siang</h4>
            <ul style={{ fontSize: "0.9rem", marginLeft: "1rem" }}>
              <li>Nasi merah + ikan + tumis cabai</li>
              <li>Sup jagung manis dengan wortel</li>
              <li>Buah apel sebagai penutup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
