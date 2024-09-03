/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://sqgajgxxqiiehuuiyrwr.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sqgajgxxqiiehuuiyrwr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;
