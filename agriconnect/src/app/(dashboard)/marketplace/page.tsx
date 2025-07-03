"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  farmer: string;
  location: string;
  stock: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  organic: boolean;
  harvestDate: string;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentFilter, setCurrentFilter] = useState("semua");

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 101,
        name: "Cabai Merah Segar",
        price: 35000,
        unit: "kg",
        category: "sayuran",
        farmer: "Ahmad Suryadi",
        location: "Boyolali, Jawa Tengah",
        stock: 50,
        description: "Cabai merah segar hasil panen langsung dari kebun",
        image:
          "https://images.unsplash.com/photo-1583258292688-d0213dc5252c?w=400",
        rating: 4.8,
        reviews: 24,
        organic: true,
        harvestDate: "2025-07-01",
      },
      {
        id: 102,
        name: "Jagung Manis",
        price: 12000,
        unit: "kg",
        category: "sayuran",
        farmer: "Siti Rahayu",
        location: "Lampung Timur",
        stock: 100,
        description: "Jagung manis organik dengan rasa yang lezat",
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
        rating: 4.9,
        reviews: 18,
        organic: true,
        harvestDate: "2025-06-28",
      },
      {
        id: 103,
        name: "Tomat Cherry Premium",
        price: 25000,
        unit: "500g",
        category: "sayuran",
        farmer: "Budi Hartono",
        location: "Cianjur, Jawa Barat",
        stock: 30,
        description: "Tomat cherry hidroponik dengan rasa manis",
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        rating: 4.7,
        reviews: 12,
        organic: false,
        harvestDate: "2025-06-30",
      },
      {
        id: 104,
        name: "Bawang Merah Brebes",
        price: 28000,
        unit: "kg",
        category: "rempah",
        farmer: "Joko Santoso",
        location: "Brebes, Jawa Tengah",
        stock: 75,
        description: "Bawang merah asli Brebes dengan aroma khas",
        image:
          "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
        rating: 4.6,
        reviews: 31,
        organic: true,
        harvestDate: "2025-06-25",
      },
      {
        id: 105,
        name: "Apel Manalagi",
        price: 40000,
        unit: "kg",
        category: "buah",
        farmer: "Wayan Suta",
        location: "Malang, Jawa Timur",
        stock: 25,
        description: "Apel manalagi segar langsung dari kebun pegunungan",
        image:
          "https://images.unsplash.com/photo-1560806887-1e4cd0b69665?w=400",
        rating: 4.5,
        reviews: 8,
        organic: false,
        harvestDate: "2025-06-20",
      },
      {
        id: 106,
        name: "Beras Organik",
        price: 18000,
        unit: "kg",
        category: "beras",
        farmer: "Suparno",
        location: "Karawang, Jawa Barat",
        stock: 200,
        description: "Beras organik kualitas premium tanpa pestisida",
        image:
          "https://images.unsplash.com/photo-1586201375765-c128505293de?w=400",
        rating: 4.8,
        reviews: 45,
        organic: true,
        harvestDate: "2025-06-15",
      },
    ];

    setProducts(mockProducts);
  }, []);

  const filteredProducts =
    currentFilter === "semua"
      ? products
      : products.filter((product) => product.category === currentFilter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filterButtons = [
    { key: "semua", label: "Semua" },
    { key: "sayuran", label: "Sayuran" },
    { key: "buah", label: "Buah" },
    { key: "rempah", label: "Rempah" },
    { key: "beras", label: "Beras" },
  ];

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Marketplace</h1>
        <p className="page-subtitle">
          Beli hasil panen segar langsung dari petani
        </p>
      </div>

      <div className="filter-bar">
        {filterButtons.map((button) => (
          <button
            key={button.key}
            className={`filter-btn ${
              currentFilter === button.key ? "active" : ""
            }`}
            onClick={() => setCurrentFilter(button.key)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="grid grid-2">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div style={{ position: "relative" }}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={160}
                className="product-image"
              />
              {product.organic && (
                <span
                  className="organic-badge"
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                  }}
                >
                  Organik
                </span>
              )}
            </div>
            <div className="product-content">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-farmer">oleh {product.farmer}</p>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.8rem",
                  marginBottom: "0.5rem",
                }}
              >
                {product.location}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="product-price">
                  {formatCurrency(product.price)}/{product.unit}
                </p>
                <div className="product-rating">
                  <span className="star">★</span>
                  <span style={{ fontSize: "0.8rem" }}>{product.rating}</span>
                </div>
              </div>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                Stok: {product.stock} {product.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
