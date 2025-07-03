import { useState, useEffect } from "react";
import { Investment } from "@/types";

interface InvestmentState {
  investments: Investment[];
  loading: boolean;
  error: string | null;
}

export const useInvestments = (status?: string) => {
  const [state, setState] = useState<InvestmentState>({
    investments: [],
    loading: true,
    error: null,
  });

  const fetchInvestments = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const params = new URLSearchParams();
      if (status) params.append("status", status);

      const response = await fetch(`/api/investments?${params}`);
      const data = await response.json();

      if (data.success) {
        setState({
          investments: data.data,
          loading: false,
          error: null,
        });
      } else {
        setState({
          investments: [],
          loading: false,
          error: data.message || "gagal mengambil data",
        });
      }
    } catch (error) {
      setState({
        investments: [],
        loading: false,
        error: "terjadi kesalahan",
      });
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [status]);

  const createInvestment = async (investmentData: any) => {
    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(investmentData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchInvestments();
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "terjadi kesalahan" };
    }
  };

  return {
    ...state,
    refetch: fetchInvestments,
    createInvestment,
  };
};
