// next.config.js
/** @type {import('next').NextConfig} */

require('dotenv').config();
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
