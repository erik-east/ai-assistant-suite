import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "5p": "5%",
        "95p": "95%",
      },
      width: {
        "10": "10%",
        "90": "90%",
      },
      minHeight: {
        "30": "30px",
      },
    },
  },
  plugins: [],
} satisfies Config;
