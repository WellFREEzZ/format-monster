import './format-monster-env.mjs';

const brand = process.env.VITE_BRAND_NAME;
const site = process.env.SITE_URL.replace(/\/+$/, '');
const source = 'https://github.com/WellFREEzZ/format-monster';
const rename = (value) => value.replace(/Bento\s?PDF/g, brand);

export function brandDocument(document) {
  document.title = rename(document.title);
  for (const heading of document.querySelectorAll(
    '[data-i18n="features.bentoPdf"]'
  )) {
    heading.textContent = rename(heading.textContent);
  }
  const localUrl = (value) =>
    value
      .replace(/^https?:\/\/(www\.)?bentopdf\.com(?=\/|$)/, site)
      .replace(/\/blog\/$/, '/blog');
  for (const link of document.head.querySelectorAll('link[rel="canonical"]')) {
    link.href = localUrl(link.href);
  }
  for (const meta of document.head.querySelectorAll('meta[content]')) {
    const key = meta.getAttribute('name') || meta.getAttribute('property');
    if (['twitter:site', 'twitter:creator'].includes(key)) {
      meta.remove(); // The upstream social accounts do not belong to this fork.
    } else if (key === 'theme-color') {
      meta.content = '#0F0C14';
    } else {
      meta.content = rename(meta.content);
      if (key === 'og:url') meta.content = localUrl(meta.content);
      if (['og:image', 'twitter:image'].includes(key)) {
        meta.content = `${site}/images/format-monster-social.png`;
      }
    }
  }
  for (const script of document.querySelectorAll(
    'script[type="application/ld+json"]'
  )) {
    let data;
    try {
      data = JSON.parse(script.textContent);
    } catch {
      continue;
    }
    const nodes = Array.isArray(data) ? data : data['@graph'] || [data];
    for (const node of nodes) {
      if (
        [
          'Organization',
          'WebSite',
          'SoftwareApplication',
          'WebApplication',
        ].includes(node['@type'])
      ) {
        if (typeof node.name === 'string') node.name = rename(node.name);
        if (typeof node.url === 'string')
          node.url = node.url.replace(
            /^https?:\/\/(www\.)?bentopdf\.com(?=\/|$)/,
            site
          );
        if (node['@type'] === 'Organization') {
          node.name = brand;
          node.url = site;
          node.logo = `${site}/images/format-monster.svg`;
          node.sameAs = [source];
        }
      }
    }
    script.textContent = JSON.stringify(data);
  }
}
