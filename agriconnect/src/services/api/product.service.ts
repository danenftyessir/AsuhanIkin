import { Product, Review, ApiResponse, PaginatedResponse } from "@/types";

class ProductService {
  private baseUrl = "/api/products";

  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    organic?: boolean;
    location?: string;
  }): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.sort) searchParams.append("sort", params.sort);
    if (params?.organic !== undefined)
      searchParams.append("organic", params.organic.toString());
    if (params?.location) searchParams.append("location", params.location);

    const response = await fetch(`${this.baseUrl}?${searchParams}`);

    if (!response.ok) {
      throw new Error("failed to fetch products");
    }

    return response.json();
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error("failed to fetch product");
    }

    return response.json();
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    unit: string;
    category: string;
    stock: number;
    image?: string;
    organic: boolean;
    harvestDate: Date;
    location: string;
    specifications?: {
      variety?: string;
      freshness?: string;
      packaging?: string;
      storageTemp?: string;
      shelfLife?: string;
    };
  }): Promise<ApiResponse<Product>> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to create product");
    }

    return response.json();
  }

  async updateProduct(
    id: string,
    data: Partial<Product>
  ): Promise<ApiResponse<Product>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to update product");
    }

    return response.json();
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("failed to delete product");
    }

    return response.json();
  }

  async getFarmerProducts(farmerId: string): Promise<ApiResponse<Product[]>> {
    const response = await fetch(`${this.baseUrl}/farmer/${farmerId}`);

    if (!response.ok) {
      throw new Error("failed to fetch farmer products");
    }

    return response.json();
  }

  async getProductReviews(productId: string): Promise<ApiResponse<Review[]>> {
    const response = await fetch(`${this.baseUrl}/${productId}/reviews`);

    if (!response.ok) {
      throw new Error("failed to fetch product reviews");
    }

    return response.json();
  }

  async addProductReview(
    productId: string,
    data: {
      rating: number;
      comment?: string;
    }
  ): Promise<ApiResponse<Review>> {
    const response = await fetch(`${this.baseUrl}/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("failed to add review");
    }

    return response.json();
  }

  async getProductCategories(): Promise<
    ApiResponse<
      Array<{
        key: string;
        label: string;
        count: number;
      }>
    >
  > {
    const response = await fetch(`${this.baseUrl}/categories`);

    if (!response.ok) {
      throw new Error("failed to fetch categories");
    }

    return response.json();
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    const response = await fetch(
      `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("failed to search products");
    }

    return response.json();
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    const response = await fetch(`${this.baseUrl}/featured`);

    if (!response.ok) {
      throw new Error("failed to fetch featured products");
    }

    return response.json();
  }

  async getRecommendedProducts(params?: {
    userId?: string;
    category?: string;
    location?: string;
    budget?: number;
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();

    if (params?.userId) searchParams.append("userId", params.userId);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.location) searchParams.append("location", params.location);
    if (params?.budget) searchParams.append("budget", params.budget.toString());

    const response = await fetch(
      `${this.baseUrl}/recommendations?${searchParams}`
    );

    if (!response.ok) {
      throw new Error("failed to fetch recommendations");
    }

    return response.json();
  }
}

export const productService = new ProductService();
