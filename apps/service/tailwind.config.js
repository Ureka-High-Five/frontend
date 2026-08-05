import leadMePreset from "@lead-me/config/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [leadMePreset],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
