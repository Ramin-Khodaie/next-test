/** @type {import('next').NextConfig} */
const nextConfig = {

    rewrites() {
        return [
            {
                source: process.env.NEXT_PUBLIC_BASE_URL_RELATIVE + '/:path*',
                destination: process.env.NEXT_PUBLIC_BASE_URL_DIRECT + '/:path*',
            }
        ]
    }
};

export default nextConfig;
