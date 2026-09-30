import { describe, it, expect } from 'vitest';
import { brandDocument } from '../../scripts/format-monster-metadata.mjs';

describe('Format Monster public metadata', () => {
  it('brands metadata without rewriting upstream attribution or quotations', () => {
    const page = new DOMParser().parseFromString(
      `<!doctype html><html><head>
      <title>Compress PDF - BentoPDF</title>
      <meta property="og:site_name" content="BentoPDF">
      <meta name="twitter:site" content="@BentoPDF">
      <meta property="og:image" content="https://www.bentopdf.com/old.png">
      <meta name="theme-color" content="#222222">
      </head><body><p>Powered by BentoPDF</p><blockquote>BentoPDF is useful.</blockquote>
      <script type="application/ld+json">{"@type":"Organization","name":"BentoPDF","sameAs":["https://x.com/BentoPDF"]}</script>
      </body></html>`,
      'text/html'
    );
    brandDocument(page);
    expect(page.title).toBe('Compress PDF - Format Monster');
    expect(page.querySelector('meta[name="twitter:site"]')).toBeNull();
    expect(
      page.querySelector('meta[name="theme-color"]')?.getAttribute('content')
    ).toBe('#0F0C14');
    expect(
      page.querySelector('meta[property="og:image"]')?.getAttribute('content')
    ).toBe('https://format.monster/images/format-monster-social.png');
    expect(page.querySelector('p')?.textContent).toBe('Powered by BentoPDF');
    expect(page.querySelector('blockquote')?.textContent).toBe(
      'BentoPDF is useful.'
    );
    expect(
      JSON.parse(page.querySelector('script')!.textContent!).sameAs
    ).toEqual(['https://github.com/WellFREEzZ/format-monster']);
  });
});
