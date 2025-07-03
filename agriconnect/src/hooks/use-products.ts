import { useState, useEffect } from "react";
import { Product } from "@/types";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProducts = (category?: string, search?: string) => {
  const [state, setState] = useState<ProductState>({
    products: [],
    loading: true,
    error: null,
  });

  const fetchProducts = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (search) params.append("search", search);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        setState({
          products: data.data,
          loading: false,
          error: null,
        });
      } else {
        setState({
          products: [],
          loading: false,
          error: data.message || "gagal mengambil data produk",
        });
      }
    } catch (error) {
      setState({
        products: [],
        loading: false,
        error: "terjadi kesalahan",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const createProduct = async (productData: any) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "terjadi kesalahan" };
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "terjadi kesalahan" };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "terjadi kesalahan" };
    }
  };

  return {
    ...state,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
