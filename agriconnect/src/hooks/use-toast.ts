import { useState, useCallback } from "react";

interface ToastData {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface UseToastReturn {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const generateId = useCallback(() => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = generateId();
      const newToast: ToastData = {
        id,
        type: "info",
        duration: 5000,
        ...toast,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    [generateId]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (message: string, title?: string) => {
      addToast({ message, title, type: "success", duration: 3000 });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      addToast({ message, title, type: "error", duration: 5000 });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      addToast({ message, title, type: "warning", duration: 4000 });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      addToast({ message, title, type: "info", duration: 3000 });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
};
