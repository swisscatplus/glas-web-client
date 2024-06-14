/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#AF1111',
            },
            keyframes: {
                wiggle: {
                    '0%, 80%, 100%': { transform: 'rotate(0deg) scale(1.05)' },
                    '10%, 30%, 50%, 70%': { transform: 'rotate(3deg) scale(1.05)' },
                    '20%, 40%, 60%': { transform: 'rotate(-3deg) scale(1.05)' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
        }
    },
    plugins: [],
};
