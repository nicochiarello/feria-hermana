/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFF9F2",
        main: "#FF65C3",
        yellow: "#FEDC5C",
        btn: "#FFB5DC",
        text: "#4E4E4E",
        secondarybg: "#EEDED4"
      },
      fontFamily: {
        oswald: ["Oswald", "cursive"],
      },
    },
  },
  plugins: [],
};
