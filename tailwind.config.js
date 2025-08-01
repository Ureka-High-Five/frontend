/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        "screen-mobile": "100svh", // small viewport height - 모바일에서 안전한 높이
        "screen-dynamic": "100dvh", // dynamic viewport height - 동적으로 변하는 높이
      },
      minHeight: {
        "screen-mobile": "100svh",
        "screen-dynamic": "100dvh",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        custom: {
          black: "#141516",
          point: "#40FEA4",
          gray: "#A1A1A1",
          darkgray: "#4A4949",
        },
      },
      fontSize: {
        "heading-h1": "24px",
        "heading-h2": "20px",
        "body-lg": "16px",
        "body-md": "14px",
        "body-sm": "12px",
        "body-xs": "10px",
      },
      fontFamily: {
        pretendard: ["Pretendard-Regular", "sans-serif"],
        bmDohyeon: ["BMDOHYEON", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate")],
};
