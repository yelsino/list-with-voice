/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GPT_TOKEN: process.env.GPT_TOKEN
    }
}

module.exports = nextConfig
