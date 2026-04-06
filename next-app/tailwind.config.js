/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "rgb(var(--brand-primary) / <alpha-value>)",
          secondary: "rgb(var(--brand-secondary) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)"
        },
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)"
      },
      /* ~120% of previous px tokens (global html font-size also scales rem utilities). */
      fontSize: {
        sm: ["14.4px", { lineHeight: "19.2px" }],
        base: ["16.8px", { lineHeight: "24px" }],
        lg: ["19.2px", { lineHeight: "28.8px" }],
        xl: ["24px", { lineHeight: "33.6px" }]
      },
      borderRadius: {
        sm: "9.6px",
        md: "14.4px",
        lg: "19.2px"
      },
      height: {
        "control-sm": "38.4px",
        "control-md": "48px",
        "control-lg": "57.6px"
      },
      minHeight: {
        "control-sm": "38.4px",
        "control-md": "48px",
        "control-lg": "57.6px"
      }
    }
  },
  plugins: []
};

