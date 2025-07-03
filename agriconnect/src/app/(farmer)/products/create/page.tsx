"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Package,
  DollarSign,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "kg",
    category: "sayuran",
    stock: "",
    organic: false,
    harvestDate: "",
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    { value: "sayuran", label: "sayuran" },
    { value: "buah", label: "buah" },
    { value: "rempah", label: "rempah" },
    { value: "beras", label: "beras" },
    { value: "umbi", label: "umbi-umbian" },
    { value: "kacang", label: "kacang-kacangan" },
  ];

  const units = [
    { value: "kg", label: "kilogram (kg)" },
    { value: "gram", label: "gram (g)" },
    { value: "ton", label: "ton" },
    { value: "ikat", label: "ikat" },
    { value: "buah", label: "buah" },
    { value: "pack", label: "pack" },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "nama produk wajib diisi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "deskripsi produk wajib diisi";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "harga harus lebih dari 0";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "stok tidak boleh kurang dari 0";
    }

    if (!formData.harvestDate) {
      newErrors.harvestDate = "tanggal panen wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        harvestDate: new Date(formData.harvestDate).toISOString(),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/products");
      } else {
        alert(data.message || "gagal menambahkan produk");
      }
    } catch (error) {
      alert("terjadi kesalahan, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="page active">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/products" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="page-title">tambah produk</h1>
            <p className="page-subtitle">daftarkan produk pertanian anda</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 className="card-title">informasi produk</h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="input-group">
              <label>nama produk *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="form-input"
                placeholder="contoh: cabai merah segar"
              />
              {errors.name && (
                <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className="input-group">
              <label>deskripsi produk *</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="form-input"
                placeholder="deskripsikan produk anda secara detail..."
                rows={4}
              />
              {errors.description && (
                <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                  {errors.description}
                </span>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="input-group">
                <label>harga *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="form-input"
                  placeholder="25000"
                  min="0"
                  step="100"
                />
                {errors.price && (
                  <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                    {errors.price}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label>satuan *</label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                  className="form-input"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="input-group">
                <label>kategori *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="form-input"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>stok *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  className="form-input"
                  placeholder="100"
                  min="0"
                />
                {errors.stock && (
                  <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                    {errors.stock}
                  </span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label>tanggal panen *</label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) =>
                  handleInputChange("harvestDate", e.target.value)
                }
                className="form-input"
              />
              {errors.harvestDate && (
                <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                  {errors.harvestDate}
                </span>
              )}
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                id="organic"
                checked={formData.organic}
                onChange={(e) => handleInputChange("organic", e.target.checked)}
                style={{ width: "auto" }}
              />
              <label htmlFor="organic" style={{ margin: 0 }}>
                produk organik
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">foto produk</h3>

          <div
            style={{
              border: "2px dashed var(--border-color)",
              borderRadius: "8px",
              padding: "2rem",
              textAlign: "center",
              background: "var(--bg-light)",
            }}
          >
            <Upload
              size={48}
              style={{ color: "var(--text-light)", marginBottom: "1rem" }}
            />
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              klik untuk upload foto produk
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // handle file upload
                  console.log("file selected:", file);
                }
              }}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="btn btn-outline">
              pilih foto
            </label>
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-light)",
              marginTop: "0.5rem",
            }}
          >
            * format yang didukung: jpg, png, jpeg. maksimal 5mb
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">preview produk</h3>

          <div
            style={{
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              padding: "1rem",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  {formData.name || "nama produk"}
                </h4>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                  {formData.description || "deskripsi produk"}
                </p>
              </div>
              {formData.organic && (
                <span className="organic-badge">organik</span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="product-price">
                Rp{" "}
                {formData.price
                  ? parseInt(formData.price).toLocaleString("id-ID")
                  : "0"}
                /{formData.unit}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                stok: {formData.stock || 0} {formData.unit}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/products" className="btn btn-outline btn-full">
              batal
            </Link>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "menyimpan..." : "simpan produk"}
            </button>
          </div>
        </div>
      </form>

      <div className="card">
        <h3 className="card-title">tips produk sukses</h3>
        <div
          style={{
            background: "var(--light-green)",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <ul style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            <li>gunakan nama produk yang jelas dan mudah dicari</li>
            <li>tulis deskripsi yang detail dan menarik</li>
            <li>upload foto produk yang berkualitas tinggi</li>
            <li>tentukan harga yang kompetitif</li>
            <li>update stok secara berkala</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
