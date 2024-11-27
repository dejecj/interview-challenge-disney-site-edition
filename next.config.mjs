/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net'
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            }
        ]
    }
}

export default nextConfig;
