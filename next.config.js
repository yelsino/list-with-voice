
/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        API_NEGOCIO: process.env.API_NEGOCIO,
    },
}

module.exports = nextConfig
