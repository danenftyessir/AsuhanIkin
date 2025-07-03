"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo-large">🌱 AgriConnect</div>
        <h1 className="landing-title">Investasi Masa Depan Pangan Indonesia</h1>
        <p className="landing-subtitle">
          Menghubungkan investor dengan petani melalui teknologi IoT modern.
          Berinvestasi, pantau real-time, dan dapatkan hasil panen segar
          langsung dari kebun.
        </p>
        <div className="role-buttons">
          <Link href="/dashboard?role=investor" className="role-btn investor">
            <span>💼 Saya Investor</span>
          </Link>
          <Link
            href="/farmer-dashboard?role=farmer"
            className="role-btn farmer"
          >
            <span>👨‍🌾 Saya Petani</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
