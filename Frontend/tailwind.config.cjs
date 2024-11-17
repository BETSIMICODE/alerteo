const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Extension des polices
      },
      keyframes: {
        bounceUp: {
          "0%, 100%": { transform: "translateY(0)" }, // Position de départ et fin
          "50%": { transform: "translateY(-10px)" }, // Point d'animation
        },
      },
      animation: {
        "bounce-up": "bounceUp 0.8s ease-in-out infinite", // Liaison des keyframes
      },
    },
  },
  plugins: [],
});
