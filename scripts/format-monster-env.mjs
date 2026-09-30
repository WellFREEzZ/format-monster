// Public build defaults for this fork. Explicit environment values take precedence.
const defaults = {
  VITE_BRAND_NAME: 'Format Monster',
  VITE_BRAND_LOGO: 'images/format-monster.svg',
  VITE_FOOTER_TEXT: 'Format Monster · Powered by BentoPDF',
  SITE_URL: 'https://format.monster',
  DISABLE_GITHUB_STARS: 'true',
};
for (const [key, value] of Object.entries(defaults)) {
  if (!process.env[key]) process.env[key] = value;
}
