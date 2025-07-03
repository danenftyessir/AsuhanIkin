import {
  Investment,
  InvestmentUser,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

class InvestmentService {
  private baseUrl = "/api/investments";

  async getInvestments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
    sort?: string;
  }): Promise<PaginatedResponse<Investment>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.status) searchParams.append("status", params.status);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.sort) searchParams.append("sort", params.sort);

    const response = await fetch(`${this.baseUrl}?${searchParams}`);

    if (!response.ok) {
      throw new Error("failed to fetch investments");
    }

    return response.json();
  }

  async getInvestmentById(id: string): Promise<ApiResponse<Investment>> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error("failed to fetch investment");
    }

    return response.json();
  }

  async createInvestment(data: {
    title: string;
    description: string;
    location: string;
    roi: number;
    duration: number;
    minInvest: number;
    target: number;
    category: string;
    image?: string;
  }): Promise<ApiResponse<Investment>> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to create investment");
    }

    return response.json();
  }

  async updateInvestment(
    id: string,
    data: Partial<Investment>
  ): Promise<ApiResponse<Investment>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to update investment");
    }

    return response.json();
  }

  async deleteInvestment(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("failed to delete investment");
    }

    return response.json();
  }

  async investInProject(
    investmentId: string,
    amount: number
  ): Promise<ApiResponse<InvestmentUser>> {
    const response = await fetch(`${this.baseUrl}/${investmentId}/invest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error("failed to invest in project");
    }

    return response.json();
  }

  async getUserInvestments(userId: string): Promise<ApiResponse<Investment[]>> {
    const response = await fetch(`${this.baseUrl}/user/${userId}`);

    if (!response.ok) {
      throw new Error("failed to fetch user investments");
    }

    return response.json();
  }

  async getInvestmentRecommendations(params?: {
    location?: string;
    budget?: number;
    riskLevel?: "low" | "medium" | "high";
    category?: string;
  }): Promise<ApiResponse<Investment[]>> {
    const searchParams = new URLSearchParams();

    if (params?.location) searchParams.append("location", params.location);
    if (params?.budget) searchParams.append("budget", params.budget.toString());
    if (params?.riskLevel) searchParams.append("riskLevel", params.riskLevel);
    if (params?.category) searchParams.append("category", params.category);

    const response = await fetch(
      `${this.baseUrl}/recommendations?${searchParams}`
    );

    if (!response.ok) {
      throw new Error("failed to fetch recommendations");
    }

    return response.json();
  }

  async getInvestmentAnalytics(id: string): Promise<
    ApiResponse<{
      totalInvested: number;
      totalReturn: number;
      roi: number;
      progress: number;
      timeline: Array<{
        date: string;
        stage: string;
        description: string;
        progress: number;
      }>;
    }>
  > {
    const response = await fetch(`${this.baseUrl}/${id}/analytics`);

    if (!response.ok) {
      throw new Error("failed to fetch investment analytics");
    }

    return response.json();
  }
}

export const investmentService = new InvestmentService();
