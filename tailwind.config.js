/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: "#1a1b25",
          light: "#1e1f2b",
        },
        accent: {
          royalBlue: "#4169e1",
          royalBlueHover: "#3158d0",
          goldenYellow: "#ffd700",
          coralPink: "rgba(255, 127, 127, 0.9)",
        },
        text: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.9)",
          tertiary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
        },
        border: {
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.2)",
          focus: "rgba(255, 255, 255, 0.4)",
        },
        bg: {
          card: "rgba(35, 36, 50, 0.5)",
          cardHover: "rgba(35, 36, 50, 0.8)",
          selected: "rgba(65, 105, 225, 0.1)",
          overlay: "rgba(0, 0, 0, 0.75)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        shake: "shake 0.4s ease-in-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "fade-in-right": "fadeInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
        scaleIn: {
          "0%": { transform: "translate(-50%, -50%) scale(0)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)" },
        },
        fadeInRight: {
          "0%": {
            transform: "translateX(10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      backdropBlur: {
        xs: "8px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
