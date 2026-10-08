export const story = {
  name: 'Sardar RDX',
  alias: 'Shah',
  beloved: 'Mano',
  met: '2025-09-10',
  lastMessage: '2026-10-03T20:36:00+05:00',
  countries: 10,
  whatsapp: 'https://wa.me/923301068874',
  instagram: 'https://www.instagram.com/sardar_rdx_devil?stkn=MXE0ZDBwNnczNjRveA==',
};

export function storyHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: path === '/' ? 'website' : 'article' },
      { property: 'og:url', content: path },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
    ],
    links: [{ rel: 'canonical', href: path }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Article', headline: title,
      description, inLanguage: 'ur-Latn',
      author: { '@type': 'Person', name: story.name, alternateName: story.alias, sameAs: [story.instagram] },
      about: [{ '@type': 'Person', name: 'Sardar RDX', alternateName: 'Shah' }, { '@type': 'Person', name: 'Mano' }],
    }) }],
  };
}