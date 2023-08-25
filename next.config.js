// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//         GPT_TOKEN: process.env.GPT_TOKEN
//     }
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = withPWA({
    env: {
        GPT_TOKEN: process.env.GPT_TOKEN
    }
})

module.exports = nextConfig
