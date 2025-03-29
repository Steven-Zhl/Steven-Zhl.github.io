// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./docs/**/*.js",
        "./docs/**/*.ts",
        "./docs/**/*.vue",
        "./docs/**/*.md",
    ],
    options: {
        safelist: ["html", "body"],
    },
};
