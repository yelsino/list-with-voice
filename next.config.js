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
    },
    webpack(config, { isServer }) {
        if (!isServer) {
            config.module.rules.push({
                test: /\.(html)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next',
                        name: 'static/media/[name].[hash].[ext]',
                    },
                },
            });
        }
        return config;
    },
})

module.exports = nextConfig
