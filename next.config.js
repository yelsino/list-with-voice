
/** @type {import('next').NextConfig} */


const withPWA = require('next-pwa')({
    dest: 'public'
})


// const nextConfig = {
//     env: {
//         OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//         NEXTAUTH_URL: process.env.NEXTAUTH_URL
//     },
// }
const nextConfig = withPWA({
    env: {
        OPENAI_API_KEY: process.env.GPT_TOKEN,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
})

module.exports = nextConfig
