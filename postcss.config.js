const plugins = ['tailwindcss', 'postcss-preset-env']

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    '@fullhuman/postcss-purgecss',
    {
      content: [
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatternsChildren: [/#__next$/, /^html$/, /^body$/]
    },
  ])
}
module.exports = {
  plugins
}
