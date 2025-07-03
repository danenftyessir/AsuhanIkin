"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  Eye,
  Star,
} from "lucide-react";
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
  createdAt: Date;
  orders: number;
  revenue: number;
  rating: number;
  reviews: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "cabai merah segar",
        description:
          "cabai merah segar hasil panen langsung dari kebun dengan kualitas premium",
        price: 35000,
        unit: "kg",
        category: "sayuran",
        stock: 50,
        image:
          "https://images.unsplash.com/photo-1583258292688-d0213dc5252c?w=400",
        organic: true,
        harvestDate: new Date("2025-07-01"),
        createdAt: new Date("2025-06-15"),
        orders: 23,
        revenue: 805000,
        rating: 4.8,
        reviews: 24,
      },
      {
        id: "2",
        name: "tomat cherry premium",
        description:
          "tomat cherry hidroponik dengan rasa manis dan tekstur renyah",
        price: 25000,
        unit: "500g",
        category: "sayuran",
        stock: 30,
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        organic: false,
        harvestDate: new Date("2025-06-30"),
        createdAt: new Date("2025-06-20"),
        orders: 18,
        revenue: 450000,
        rating: 4.7,
        reviews: 12,
      },
      {
        id: "3",
        name: "jagung manis organik",
        description:
          "jagung manis organik dengan rasa yang lezat dan manis alami",
        price: 12000,
        unit: "kg",
        category: "sayuran",
        stock: 0,
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
        organic: true,
        harvestDate: new Date("2025-06-28"),
        createdAt: new Date("2025-06-10"),
        orders: 45,
        revenue: 540000,
        rating: 4.9,
        reviews: 18,
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  };

  const categories = [
    { key: "semua", label: "semua" },
    { key: "sayuran", label: "sayuran" },
    { key: "buah", label: "buah" },
    { key: "rempah", label: "rempah" },
    { key: "beras", label: "beras" },
  ];

  const filteredProducts =
    selectedCategory === "semua"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDeleteProduct = (productId: string) => {
    if (confirm("apakah anda yakin ingin menghapus produk ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const totalRevenue = products.reduce(
    (sum, product) => sum + product.revenue,
    0
  );
  const totalOrders = products.reduce(
    (sum, product) => sum + product.orders,
    0
  );
  const activeProducts = products.filter((p) => p.stock > 0).length;

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">produk saya</h1>
        <p className="page-subtitle">kelola dan pantau penjualan produk</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-value">{formatCurrency(totalRevenue)}</div>
          <div className="stat-label">total pendapatan</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value">{activeProducts}</div>
          <div className="stat-label">produk aktif</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-label">total pesanan</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
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
          <Link href="/products/create" className="btn btn-primary btn-sm">
            <Plus size={16} />
            tambah produk
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="card">
          <p>memuat produk...</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <div style={{ position: "relative", marginBottom: "1rem" }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={150}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "0.5rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  {product.organic && (
                    <span className="organic-badge">organik</span>
                  )}
                  <span
                    style={{
                      background:
                        product.stock > 0 ? "var(--primary-green)" : "#e74c3c",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                    }}
                  >
                    {product.stock > 0 ? `stok: ${product.stock}` : "habis"}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  {product.name}
                </h4>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Star size={16} className="star" fill="currentColor" />
                  <span>{product.rating}</span>
                  <span
                    style={{ color: "var(--text-light)", fontSize: "0.8rem" }}
                  >
                    ({product.reviews} ulasan)
                  </span>
                </div>
                <div
                  className="product-price"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "var(--primary-green)",
                  }}
                >
                  {formatCurrency(product.price)}/{product.unit}
                </div>
              </div>

              <div
                className="stats-grid"
                style={{
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: "1rem",
                }}
              >
                <div className="stat-card green" style={{ padding: "0.75rem" }}>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    {formatCurrency(product.revenue)}
                  </div>
                  <div className="stat-label">pendapatan</div>
                </div>
                <div className="stat-card blue" style={{ padding: "0.75rem" }}>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    {product.orders}
                  </div>
                  <div className="stat-label">pesanan</div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  color: "var(--text-light)",
                  marginBottom: "1rem",
                }}
              >
                <span>
                  panen: {product.harvestDate.toLocaleDateString("id-ID")}
                </span>
                <span>
                  dibuat: {product.createdAt.toLocaleDateString("id-ID")}
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link
                  href={`/products/${product.id}`}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <Eye size={16} />
                  detail
                </Link>
                <Link
                  href={`/products/${product.id}/edit`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Edit size={16} />
                  edit
                </Link>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="card">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Package
              size={48}
              style={{ color: "var(--text-light)", marginBottom: "1rem" }}
            />
            <h3>belum ada produk</h3>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              mulai dengan menambahkan produk pertanian pertama anda
            </p>
            <Link href="/products/create" className="btn btn-primary">
              <Plus size={16} />
              tambah produk
            </Link>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">tips penjualan</h3>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <ul style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            <li>gunakan foto produk yang menarik dan berkualitas tinggi</li>
            <li>berikan deskripsi yang detail dan jujur</li>
            <li>update stok secara berkala untuk kepercayaan pembeli</li>
            <li>tanggapi ulasan pelanggan dengan baik</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
