export const APP_NAME = "AgriConnect";
export const APP_DESCRIPTION = "Platform Investasi Pertanian Indonesia";
export const APP_VERSION = "1.0.0";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  THEME: "theme",
  LANGUAGE: "language",
  CART: "cart",
  FAVORITES: "favorites",
  LAST_LOCATION: "last_location",
} as const;

export const USER_ROLES = {
  INVESTOR: "INVESTOR",
  FARMER: "FARMER",
  ADMIN: "ADMIN",
} as const;

export const INVESTMENT_STATUS = {
  FUNDING: "FUNDING",
  PLANTING: "PLANTING",
  HARVESTING: "HARVESTING",
  COMPLETED: "COMPLETED",
} as const;

export const NOTIFICATION_TYPES = {
  INVESTMENT: "INVESTMENT",
  ORDER: "ORDER",
  RETURN: "RETURN",
  SYSTEM: "SYSTEM",
} as const;

export const PRODUCT_CATEGORIES = {
  SAYURAN: "sayuran",
  BUAH: "buah",
  REMPAH: "rempah",
  BERAS: "beras",
  LAINNYA: "lainnya",
} as const;

export const INVESTMENT_CATEGORIES = {
  SAYURAN: "sayuran",
  BUAH: "buah",
  REMPAH: "rempah",
  BERAS: "beras",
  ORGANIK: "organik",
} as const;

export const UNITS = {
  KG: "kg",
  GRAM: "gram",
  PCS: "pcs",
  IKAT: "ikat",
  KARUNG: "karung",
  LITER: "liter",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  TITLE_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 1000,
  ROI_MIN: 1,
  ROI_MAX: 100,
  DURATION_MIN: 1,
  DURATION_MAX: 24,
} as const;

export const FILE_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  MESSAGE: "message",
  NOTIFICATION: "notification",
  IOT_DATA: "iot_data",
  INVESTMENT_UPDATE: "investment_update",
} as const;

export const IOT_THRESHOLDS = {
  TEMPERATURE: {
    MIN: 20,
    MAX: 35,
    OPTIMAL_MIN: 25,
    OPTIMAL_MAX: 30,
  },
  HUMIDITY: {
    MIN: 40,
    MAX: 90,
    OPTIMAL_MIN: 60,
    OPTIMAL_MAX: 80,
  },
  SOIL_PH: {
    MIN: 5.5,
    MAX: 7.5,
    OPTIMAL_MIN: 6.0,
    OPTIMAL_MAX: 7.0,
  },
  NUTRIENTS: {
    MIN: 50,
    MAX: 100,
    OPTIMAL_MIN: 70,
    OPTIMAL_MAX: 100,
  },
} as const;

export const COLORS = {
  PRIMARY: "#27ae60",
  PRIMARY_DARK: "#219150",
  PRIMARY_LIGHT: "#d5f4e6",
  SECONDARY_BLUE: "#3498db",
  SECONDARY_ORANGE: "#f39c12",
  SECONDARY_PURPLE: "#9b59b6",
  TEXT_DARK: "#2c3e50",
  TEXT_LIGHT: "#7f8c8d",
  BG_LIGHT: "#f8f9fa",
  BG_WHITE: "#ffffff",
  BORDER: "#e9ecef",
  SUCCESS: "#27ae60",
  ERROR: "#e74c3c",
  WARNING: "#f39c12",
  INFO: "#3498db",
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  NUMERIC: /^\d+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/,
} as const;

export const LOCATION_PROVINCES = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Sumatera Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Lampung",
  "Banten",
  "Yogyakarta",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Papua",
  "Papua Barat",
  "Gorontalo",
  "Maluku Utara",
  "Bangka Belitung",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Bengkulu",
  "Aceh",
  "Sulawesi Barat",
  "Kalimantan Utara",
] as const;

export const CROP_VARIETIES = {
  CABAI: [
    "Cabai Merah Besar",
    "Cabai Merah Keriting",
    "Cabai Rawit",
    "Cabai Paprika",
  ],
  TOMAT: ["Tomat Beef", "Tomat Cherry", "Tomat Apel", "Tomat Sayur"],
  JAGUNG: ["Jagung Manis", "Jagung Pulut", "Jagung Pakan", "Jagung Pipil"],
  BAWANG: ["Bawang Merah", "Bawang Putih", "Bawang Bombay", "Bawang Daun"],
  KENTANG: [
    "Kentang Granola",
    "Kentang Atlantik",
    "Kentang Cipanas",
    "Kentang Supejohn",
  ],
} as const;

export const INVESTMENT_RISK_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export const PAYMENT_METHODS = {
  BANK_TRANSFER: "bank_transfer",
  EWALLET: "ewallet",
  CREDIT_CARD: "credit_card",
  VIRTUAL_ACCOUNT: "virtual_account",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const FORUM_CATEGORIES = {
  DISKUSI: "diskusi",
  HAMA: "hama",
  TEKNOLOGI: "teknologi",
  INVESTASI: "investasi",
  HARGA: "harga",
  CUACA: "cuaca",
} as const;

export const EDUCATION_CATEGORIES = {
  NUTRISI: "nutrisi",
  KESEHATAN: "kesehatan",
  PERTANIAN: "pertanian",
  TEKNOLOGI: "teknologi",
  BISNIS: "bisnis",
} as const;
