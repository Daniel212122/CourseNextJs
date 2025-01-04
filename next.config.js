/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    env: {
       BASEPATH_API_USERS: 'https://a9ub0zdqbh.execute-api.us-east-1.amazonaws.com'
      // BASEPATH_API_USERS: 'http://localhost:4000'
    }
  };
  
  module.exports = nextConfig;