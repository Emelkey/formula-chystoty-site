import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#63B532",
          hover: "#4E9D26",
          black: "#111111",
          graphite: "#2B2B2B",
          mist: "#F6F8F5"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(17, 17, 17, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
