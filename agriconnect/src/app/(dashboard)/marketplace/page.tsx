"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Filter, Star, MapPin, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  image: string;
  organic: boolean;
  harvestDate: Date;
  farmer: {
    id: string;
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  averageRating: number;
  totalReviews: number;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const categories = [
    { key: "semua", label: "semua" },
    { key: "sayuran", label: "sayuran" },
    { key: "buah", label: "buah" },
    { key: "rempah", label: "rempah" },
    { key: "beras", label: "beras" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "semua")
        params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "semua" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">marketplace</h1>
        <p className="page-subtitle">produk segar langsung dari petani</p>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
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
              placeholder="cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={16} />
            filter
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

      {loading ? (
        <div className="card">
          <p>memuat produk...</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={160}
                className="product-image"
              />
              <div className="product-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4 className="product-name">{product.name}</h4>
                  {product.organic && (
                    <span className="organic-badge">organik</span>
                  )}
                </div>

                <div className="product-farmer">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <MapPin size={14} />
                    <span>{product.farmer.name}</span>
                    {product.farmer.verified && (
                      <span style={{ color: "var(--primary-green)" }}>✓</span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {product.farmer.location}
                  </p>
                </div>

                <div className="product-rating">
                  <Star className="star" size={16} fill="currentColor" />
                  <span>{product.averageRating}</span>
                  <span
                    style={{ color: "var(--text-light)", fontSize: "0.8rem" }}
                  >
                    ({product.totalReviews} ulasan)
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <div>
                    <div className="product-price">
                      {formatCurrency(product.price)}/{product.unit}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                    >
                      stok: {product.stock} {product.unit}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart size={16} />
                    {cart[product.id] ? `(${cart[product.id]})` : ""}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h3>produk tidak ditemukan</h3>
            <p style={{ color: "var(--text-light)" }}>
              coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        </div>
      )}

      {Object.keys(cart).length > 0 && (
        <div
          className="card"
          style={{
            position: "fixed",
            bottom: "100px",
            left: "1rem",
            right: "1rem",
            zIndex: 99,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>
                {Object.values(cart).reduce((sum, qty) => sum + qty, 0)} item
                dalam keranjang
              </strong>
            </div>
            <button className="btn btn-primary">lihat keranjang</button>
          </div>
        </div>
      )}
    </div>
  );
}
