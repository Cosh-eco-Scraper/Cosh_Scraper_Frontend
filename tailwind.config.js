// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['var(--font-inter)'],
                'source-serif-pro': ['var(--font-source-serif-pro)'],
            },
        },
    },
    plugins: [],
};