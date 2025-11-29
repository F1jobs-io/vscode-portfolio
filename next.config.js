const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/vscode-portfolio' : '',
  assetPrefix: isProd ? '/vscode-portfolio/' : '',
  images: {
    unoptimized: true,
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'imgur.com',
    ],
  },
  trailingSlash: true,
};
