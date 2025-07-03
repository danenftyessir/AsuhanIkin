import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#27ae60",
          dark: "#219150",
          light: "#d5f4e6",
        },
        secondary: {
          blue: "#3498db",
          orange: "#f39c12",
          purple: "#9b59b6",
        },
        text: {
          dark: "#2c3e50",
          light: "#7f8c8d",
        },
        bg: {
          light: "#f8f9fa",
          white: "#ffffff",
        },
        border: {
          color: "#e9ecef",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        custom: "0 4px 15px rgba(0, 0, 0, 0.1)",
        "custom-hover": "0 8px 25px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
