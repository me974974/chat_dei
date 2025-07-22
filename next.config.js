/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
        // supprime complètement swcPlugins pour éviter les erreurs
    },
    images: {
        domains: [
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig
