"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Investment {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  roi: string;
  duration: string;
  minInvest: string;
  target: string;
  collected: string;
  investors: number;
  status: string;
  progress: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  farmer: string;
  location: string;
  stock: number;
  image: string;
  rating: number;
  organic: boolean;
}

export default function DashboardPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // mock data loading
    const mockInvestments: Investment[] = [
      {
        id: 1,
        title: "Cabai Merah Premium",
        subtitle: "Boyolali, Jawa Tengah",
        description:
          "Proyek penanaman cabai merah dengan sistem IoT monitoring",
        roi: "18%",
        duration: "6 bulan",
        minInvest: "Rp 1.000.000",
        target: "Rp 50.000.000",
        collected: "Rp 32.000.000",
        investors: 8,
        status: "funding",
        progress: 65,
        image:
          "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
      },
      {
        id: 2,
        title: "Jagung Manis Organik",
        subtitle: "Lampung Timur",
        description:
          "Budidaya jagung manis organik dengan metode ramah lingkungan",
        roi: "15%",
        duration: "4 bulan",
        minInvest: "Rp 500.000",
        target: "Rp 25.000.000",
        collected: "Rp 18.000.000",
        investors: 4,
        status: "planting",
        progress: 85,
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=600",
      },
    ];

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
        image:
          "https://images.unsplash.com/photo-1583258292688-d0213dc5252c?w=400",
        rating: 4.8,
        organic: true,
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
        image:
          "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
        rating: 4.9,
        organic: true,
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
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        rating: 4.7,
        organic: false,
      },
    ];

    setInvestments(mockInvestments);
    setProducts(mockProducts);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Selamat datang di AgriConnect</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-value">Rp 25M</div>
          <div className="stat-label">Total Investasi</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-value">8</div>
          <div className="stat-label">Proyek Aktif</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-value">+12.5%</div>
          <div className="stat-label">ROI</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Rekomendasi Investasi</h3>
          <Link href="/investment" className="btn btn-sm btn-outline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-2">
          {investments.map((investment) => (
            <div key={investment.id} className="investment-card">
              <Image
                src={investment.image}
                alt={investment.title}
                width={600}
                height={200}
                className="investment-image"
              />
              <div className="investment-content">
                <h3 className="investment-title">{investment.title}</h3>
                <p className="investment-subtitle">{investment.subtitle}</p>
                <div className="investment-stats">
                  <div className="investment-stat">
                    <div className="investment-stat-value">
                      {investment.roi}
                    </div>
                    <div className="investment-stat-label">ROI</div>
                  </div>
                  <div className="investment-stat">
                    <div className="investment-stat-value">
                      {investment.duration}
                    </div>
                    <div className="investment-stat-label">Durasi</div>
                  </div>
                  <div className="investment-stat">
                    <div className="investment-stat-value">
                      {investment.investors}
                    </div>
                    <div className="investment-stat-label">Investor</div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${investment.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Produk Terbaru</h3>
          <Link href="/marketplace" className="btn btn-sm btn-outline">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-3">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={160}
                className="product-image"
              />
              <div className="product-content">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-farmer">by {product.farmer}</p>
                <p className="product-price">
                  {formatCurrency(product.price)}/{product.unit}
                </p>
                {product.organic && (
                  <span className="organic-badge">Organik</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
