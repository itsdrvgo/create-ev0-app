import "./env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "utfs.io" }, { hostname: "**.clerk.com" }],
    },
};

export default nextConfig;
