export default {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'tatianamac/grappa-next',
    branch: 'main',
  },
  media_folder: 'public/img',
  public_folder: 'img',  
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/home.md',
          fields: [
            {
              label: 'Hero Title',
              name: 'heroHeader',
              widget: 'string',
            },
            {
              label: 'Hero Subheader',
              name: 'heroSubheader',
              widget: 'string',
            },
            {
              label: 'Featured Content One Header',
              name: 'featuredContentTwoHeader',
              widget: 'markdown',
            },
            {
              label: 'Featured Content One Subheader',
              name: 'featuredContentTwoSubheader',
              widget: 'markdown',
            },
            {
              label: 'Featured Content One Image',
              name: 'featuredContentTwoImage',
              widget: 'image',
            },
            {
              label: 'Featured Content One Image Alt',
              name: 'featuredContentTwoImageAlt',
              widget: 'string',
            },
            {
              label: 'Featured Content One Header',
              name: 'featuredContentTwoHeader',
              widget: 'markdown',
            },
            {
              label: 'Featured Content One Subheader',
              name: 'featuredContentTwoSubheader',
              widget: 'markdown',
            },
            {
              label: 'Featured Content Two Image',
              name: 'featuredContentTwoImage',
              widget: 'image',
            },
            {
              label: 'Featured Content Two Image Alt',
              name: 'featuredContentTwoImageAlt',
              widget: 'string',
            },
            {
              label: 'Featured Content Three Subheader',
              name: 'featuredContentThreeSubheader',
              widget: 'markdown',
            },
            {
              label: 'Featured Content Three Image',
              name: 'featuredContentThreeImage',
              widget: 'image',
            },
            {
              label: 'Featured Content Three Image Alt',
              name: 'featuredContentThreeImageAlt',
              widget: 'string',
            },
          ],
        },
      ],
    },
  ],
};