/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000",
                pioneers: "#f7f7f3",
                problem: "#0c0c0c",
                card: "#1a1a1a",
                primary: "#ff4d00", // Problem orange
                accent: "#dbff00", // Hero lime
                gold: "#ffcc00", // Hero gold
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
