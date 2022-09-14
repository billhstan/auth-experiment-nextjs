/** @type {import('next').NextConfig} */
console.log('next.config.js>>>[process.env.NODE_ENV] : ' , process.env.NODE_ENV);

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    //Will only be available on the server side
    //Two important references:
    //https://frontend-digest.com/environment-variables-in-next-js-9a272f0bf655
    //https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  }

}

module.exports = nextConfig
