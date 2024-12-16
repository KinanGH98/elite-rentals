/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.daisyui.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_SUPABASE_URL_NO_PROTOCOL,
                port: '',
            },
        ],
    },
};

export default nextConfig;
