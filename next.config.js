// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//   },
//   images: {
//     domains: ['lh3.googleusercontent.com'],
//   },
//   reactStrictMode: true,
// });
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // next.js config
    reactStrictMode: true,
      images: {
    domains: ['lh3.googleusercontent.com'],
  },
})