import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-poppins)", "sans-serif"],
        body1: ["var(--font-inter)", "sans-serif"],
        body2: ["var(--font-sora)", "sans-serif"],
        body3: ["var(--font-rubik)", "sans-serif"],
        body4: ["var(--font-urbanist)", "sans-serif"],
        body5: ["var(--font-min)", "sans-serif"],
        body6: ["ClashDisplay-Semibold"],
      },
      fontWeight: {
        "300": "300",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
