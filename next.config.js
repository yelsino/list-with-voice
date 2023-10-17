// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//         GPT_TOKEN: process.env.GPT_TOKEN
//     }
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */


// const withPWA = require('next-pwa')({
//     dest: 'public'
// })


const nextConfig = {
    env: {
        GPT_TOKEN: process.env.GPT_TOKEN,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
}
// const nextConfig = withPWA({
//     env: {
//         GPT_TOKEN: process.env.GPT_TOKEN,
//         NEXTAUTH_URL: process.env.NEXTAUTH_URL
//     },
// })

module.exports = nextConfig
