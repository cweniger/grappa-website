const path = require("path");
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/google-calendar",
  "@fullcalendar/daygrid",
]);
module.exports = withTM({
  webpack5: true,
  webpack(config) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            loader: "frontmatter-markdown-loader",
          },
          {
            test: /\.yml$/,
            type: "json",
            use: "yaml-loader",
          },
        ]),
      },
    };
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
