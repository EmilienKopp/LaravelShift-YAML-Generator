/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge:["./src/**/*.{html,js,svelte}"],
  content: ["./src/**/*.{html,js,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
