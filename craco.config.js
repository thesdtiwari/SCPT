// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss')('./src/css/tailwind.config.js'),
        // require('autoprefixer')
      ],
    },
  },
};