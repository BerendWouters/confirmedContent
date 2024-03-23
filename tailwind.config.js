/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,html}"],
  theme: {
    extend : {
        backgroundImage: {
            'pattern': "url('/static/headerimg_2024.svg')",
            'logo_white': "url('/static/logo_white.svg')",
        },
        colors: {
            'fri3d_A': 'rgba(136,53,201, 1)',
            'fri3d_B': 'rgba(255,173,100, 1)',
            'fri3d_B_light': '#ffe3ca',
            'fri3d_A_light': 'rgba(192,133,255, 1)',
            'fri3d_C': 'rgba(60, 232, 179, 1)',
            'fri3d_C_dark': 'rgba(47,173,131, 1)',
            'fri3d_red' : 'rgba(255,62,62,1)',
            'fri3d_darkgrey' : 'rgba(45,45,45,1)'
        },
    },
  }
}
