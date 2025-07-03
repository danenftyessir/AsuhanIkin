import { NextRequest, NextResponse } from "next/server";

interface RecommendationCriteria {
  location?: string;
  budget?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  category?: string;
  userId?: string;
}

interface Investment {
  id: string;
  title: string;
  description: string;
  location: string;
  roi: number;
  duration: number;
  minInvest: number;
  target: number;
  collected: number;
  status: string;
  category: string;
  image: string;
  riskLevel: 'low' | 'medium' | 'high';
  score: number;
  farmer: {
    id: string;
    name: string;
    rating: number;
    experience: number;
    verified: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const criteria: RecommendationCriteria = {
      location: searchParams.get('location') || undefined,
      budget: searchParams.get('budget') ? parseInt(searchParams.get('budget')!) : undefined,
      riskLevel: searchParams.get('riskLevel') as 'low' | 'medium' | 'high' || undefined,
      category: searchParams.get('category') || undefined,
      userId: searchParams.get('userId') || undefined,
    };

    const mockInvestments: Investment[] = [
      {
        id: "rec-1",
        title: "cabai merah super produktif",
        description: "varietas cabai merah dengan teknologi greenhouse dan sistem irigasi otomatis",
        location: "boyolali, jawa tengah",
        roi: 18,
        duration: 5,
        minInvest: 1000000,
        target: 40000000,
        collected: 15000000,
        status: "FUNDING",
        category: "sayuran",
        image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
        riskLevel: "medium",
        score: 0,
        farmer: {
          id: "farmer-1",
          name: "ahmad suryadi",
          rating: 4.9,
          experience: 15,
          verified: true
        }
      },
      {
        id: "rec-2",
        title: "tomat hidroponik premium",
        description: "budidaya tomat dengan sistem hidroponik nft untuk hasil maksimal",
        location: "cianjur, jawa barat", 
        roi: 22,
        duration: 4,
        minInvest: 2000000,
        target: 25000000,
        collected: 8000000,
        status: "FUNDING",
        category: "sayuran",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
        riskLevel: "high",
        score: 0,
        farmer: {
          id: "farmer-2",
          name: "budi hartono",
          rating: 4.7,
          experience: 12,
          verified: true
        }
      },
      {
        id: "rec-3",
        title: "jagung organik skala besar",
        description: "program pertanian organik jagung dengan sertifikasi internasional",
        location: "lampung timur",
        roi: 15,
        duration: 6,
        minInvest: 500000,
        target: 60000000,
        collected: 45000000,
        status: "FUNDING",
        category: "sayuran",
        image: "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=600",
        riskLevel: "low",
        score: 0,
        farmer: {
          id: "farmer-3",
          name: "siti rahayu",
          rating: 4.8,
          experience: 18,
          verified: true
        }
      },
      {
        id: "rec-4",
        title: "bawang merah brebes",
        description: "investasi di sentra bawang merah brebes dengan teknologi modern",
        location: "brebes, jawa tengah",
        roi: 20,
        duration: 3,
        minInvest: 1500000,
        target: 35000000,
        collected: 12000000,
        status: "FUNDING",
        category: "rempah",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600",
        riskLevel: "medium",
        score: 0,
        farmer: {
          id: "farmer-4",
          name: "joko santoso",
          rating: 4.6,
          experience: 20,
          verified: true
        }
      },
      {
        id: "rec-5",
        title: "padi organik premium",
        description: "budidaya padi organik dengan sistem sri dan teknologi drone",
        location: "karawang, jawa barat",
        roi: 12,
        duration: 8,
        minInvest: 800000,
        target: 80000000,
        collected: 55000000,
        status: "FUNDING",
        category: "beras",
        image: "https://images.unsplash.com/photo-1586201375765-c128505293de?w=600",
        riskLevel: "low",
        score: 0,
        farmer: {
          id: "farmer-5",
          name: "suparno",
          rating: 4.8,
          experience: 25,
          verified: true
        }
      }
    ];

    const recommendations = calculateRecommendations(mockInvestments, criteria);

    return NextResponse.json({
      success: true,
      data: recommendations,
      meta: {
        total: recommendations.length,
        criteria: criteria,
        algorithm: "agricultural-ai-v1.0"
      }
    });
  } catch (error) {
    console.error("recommendations error:", error);
    return NextResponse.json(
      { success: false, message: "terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

function calculateRecommendations(investments: Investment[], criteria: RecommendationCriteria): Investment[] {
  const scoredInvestments = investments.map(investment => {
    let score = 0;

    // base score dari rating petani dan experience
    score += investment.farmer.rating * 10;
    score += investment.farmer.experience * 0.5;
    
    // bonus untuk petani terverifikasi
    if (investment.farmer.verified) {
      score += 10;
    }

    // scoring berdasarkan lokasi
    if (criteria.location) {
      const locationMatch = investment.location.toLowerCase().includes(criteria.location.toLowerCase());
      if (locationMatch) {
        score += 20;
      }
    }

    // scoring berdasarkan budget
    if (criteria.budget) {
      if (investment.minInvest <= criteria.budget) {
        score += 15;
        
        // bonus jika budget cocok dengan minimal invest
        const budgetRatio = criteria.budget / investment.minInvest;
        if (budgetRatio >= 1 && budgetRatio <= 5) {
          score += 10;
        }
      } else {
        score -= 20; // penalti jika budget tidak cukup
      }
    }

    // scoring berdasarkan risk level
    if (criteria.riskLevel) {
      if (investment.riskLevel === criteria.riskLevel) {
        score += 15;
      } else if (
        (criteria.riskLevel === 'medium' && investment.riskLevel === 'low') ||
        (criteria.riskLevel === 'high' && investment.riskLevel === 'medium')
      ) {
        score += 5; // bonus kecil untuk risk level yang berdekatan
      }
    }

    // scoring berdasarkan kategori
    if (criteria.category && investment.category === criteria.category) {
      score += 10;
    }

    // scoring berdasarkan roi dan duration
    const roiScore = Math.min(investment.roi, 25) * 0.8;
    const durationScore = Math.max(0, 12 - investment.duration) * 0.5;
    score += roiScore + durationScore;

    // scoring berdasarkan progress funding
    const progressRatio = investment.collected / investment.target;
    if (progressRatio >= 0.3 && progressRatio <= 0.8) {
      score += 8; // sweet spot untuk funding progress
    }

    // scoring berdasarkan status
    if (investment.status === "FUNDING") {
      score += 5;
    }

    // faktor musim dan cuaca (simulasi)
    const seasonalBonus = calculateSeasonalBonus(investment.category);
    score += seasonalBonus;

    // faktor wilayah produktivitas (simulasi)
    const regionalBonus = calculateRegionalBonus(investment.location);
    score += regionalBonus;

    return {
      ...investment,
      score: Math.round(score)
    };
  });

  // urutkan berdasarkan score dan ambil top 5
  return scoredInvestments
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function calculateSeasonalBonus(category: string): number {
  const currentMonth = new Date().getMonth() + 1;
  
  // simulasi faktor musim untuk berbagai kategori
  const seasonalFactors: { [key: string]: number[] } = {
    'sayuran': [5, 8, 10, 8, 5, 3, 2, 3, 5, 8, 10, 8], // jan-dec
    'buah': [3, 5, 8, 10, 8, 5, 3, 2, 3, 5, 8, 10],
    'rempah': [8, 8, 5, 3, 2, 3, 5, 8, 10, 10, 8, 8],
    'beras': [2, 3, 5, 8, 10, 8, 5, 3, 2, 3, 5, 8],
  };

  return seasonalFactors[category]?.[currentMonth - 1] || 0;
}

function calculateRegionalBonus(location: string): number {
  const productiveRegions = [
    'jawa tengah',
    'jawa timur', 
    'jawa barat',
    'lampung',
    'sumatera utara',
    'sumatera barat'
  ];

  const isProductiveRegion = productiveRegions.some(region => 
    location.toLowerCase().includes(region)
  );

  return isProductiveRegion ? 5 : 0;
}