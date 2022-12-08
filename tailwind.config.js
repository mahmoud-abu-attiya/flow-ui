/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            pri: "#2663DF",
         },
         container: {
            center: true,
            padding: "1rem",
         },
      },
   },
   plugins: [],
};
