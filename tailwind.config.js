/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        arial: ["Arial", "sans-serif"],
        georgia: ["Georgia", "serif"],
        times: ["Times New Roman", "serif"],
        courier: ["Courier New", "monospace"],
        verdana: ["Verdana", "sans-serif"],
        tahoma: ["Tahoma", "sans-serif"],
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
