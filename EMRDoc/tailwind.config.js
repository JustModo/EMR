/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a3e635",

          secondary: "#4ade80",

          accent: "#00ff00",

          neutral: "#e5e7eb",

          "base-100": "#ffffff",

          info: "#60a5fa",

          success: "#bef264",

          warning: "#fef08a",

          error: "#f87171",
        },
      },
    ],
  },
  plugins: [daisyui],
};
