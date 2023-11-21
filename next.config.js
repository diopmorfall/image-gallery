/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { //* this configuration is needed when we use remote urls; we destructure  it here
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**'
            }
        ]
    }
}

module.exports = nextConfig
