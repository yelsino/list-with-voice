// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//         GPT_TOKEN: process.env.GPT_TOKEN
//     }
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */

if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(
      `${process.env.PWD}/node_modules/canvas/build/Release:`,
    )
  ) {
    process.env.LD_LIBRARY_PATH = `${
      process.env.PWD
    }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
  }

const withPWA = require('next-pwa')({
    dest: 'public'
})



const nextConfig = withPWA({
    env: {
        GPT_TOKEN: process.env.GPT_TOKEN
    },
})

module.exports = nextConfig
