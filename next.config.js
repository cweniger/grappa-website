// const withMdxEnhanced = require("next-mdx-enhanced");
// const rehypePrism = require("@mapbox/rehype-prism");

module.exports = {
  distDir: '../dist',
  webpack: (config) => {
    config.module.rules.push(
      ...[
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
      },
      {
        test: /\.yml$/,
        type: "json",
         use: "yaml-loader",
      },
      ]
      );
    return config;
  },
};

// module.exports = withMdxEnhanced({
//   layoutPath: "src/layouts",
//   defaultLayout: true,
//   rehypePlugins: [rehypePrism],
// })({
//   pageExtensions: ["mdx", "tsx", "md"],
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.module.rules.push(
  //     ...[
  //       {
  //         test: /\.yml$/,
  //         type: "json",
  //         use: "yaml-loader",
  //       },
  //       {
  //         test: /\.svg$/,
  //         use: "@svgr/webpack",
  //       },
  //     ]
  //   );
  //   return config;
  // },
// });
