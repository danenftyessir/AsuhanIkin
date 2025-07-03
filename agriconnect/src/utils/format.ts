export const formatCurrency = (
  amount: number,
  currency: string = "IDR"
): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("id-ID").format(num);
};

export const formatDecimal = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${formatDecimal(num, decimals)}%`;
};

export const formatDate = (
  date: Date | string,
  format: "short" | "medium" | "long" = "medium"
): string => {
  const d = new Date(date);

  let options: Intl.DateTimeFormatOptions;

  if (format === "short") {
    options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  } else if (format === "medium") {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  } else {
    // long
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }

  return d.toLocaleDateString("id-ID", options);
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const d = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "baru saja";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit lalu`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam lalu`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari lalu`;
  } else {
    return formatDate(d, "short");
  }
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} menit`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} jam ${remainingMinutes} menit`
      : `${hours} jam`;
  } else {
    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    return remainingHours > 0
      ? `${days} hari ${remainingHours} jam`
      : `${days} hari`;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("62")) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith("0")) {
    return `+62${cleaned.substring(1)}`;
  } else {
    return `+62${cleaned}`;
  }
};

export const formatInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
};

export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const formatTruncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};

export const formatCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatTitle = (text: string): string => {
  return text
    .split(" ")
    .map((word) => formatCapitalize(word))
    .join(" ");
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else {
    return `${(meters / 1000).toFixed(1)} km`;
  }
};

export const formatArea = (hectares: number): string => {
  if (hectares < 1) {
    return `${Math.round(hectares * 10000)} m²`;
  } else {
    return `${hectares.toFixed(2)} ha`;
  }
};

export const formatWeight = (grams: number): string => {
  if (grams < 1000) {
    return `${grams} g`;
  } else {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
};

export const formatTemperature = (celsius: number): string => {
  return `${celsius.toFixed(1)}°C`;
};

export const formatHumidity = (percentage: number): string => {
  return `${Math.round(percentage)}%`;
};

export const formatROI = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatProgress = (current: number, total: number): string => {
  const percentage = (current / total) * 100;
  return `${Math.round(percentage)}%`;
};

export const formatInvestmentStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    FUNDING: "Pendanaan",
    PLANTING: "Penanaman",
    HARVESTING: "Panen",
    COMPLETED: "Selesai",
  };

  return statusMap[status] || status;
};

export const formatUserRole = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    INVESTOR: "Investor",
    FARMER: "Petani",
    ADMIN: "Admin",
  };

  return roleMap[role] || role;
};

export const formatNotificationType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    INVESTMENT: "Investasi",
    ORDER: "Pesanan",
    RETURN: "Return",
    SYSTEM: "Sistem",
  };

  return typeMap[type] || type;
};
