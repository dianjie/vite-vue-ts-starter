module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    // https://github.com/tailwindlabs/tailwindcss/discussions/5969
    preflight: false
  },
  theme: {
    extend: {}
  },
  plugins: []
}
