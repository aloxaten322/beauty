import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { notFoundSeo, routeSeo, type SeoMetadata } from './src/data/seoMetadata.js'

const seoStartMarker = '<!-- ROUTE_SEO_START -->'
const seoEndMarker = '<!-- ROUTE_SEO_END -->'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;')

const renderSeoTags = (metadata: SeoMetadata) => {
  const tags = [
    `<title data-initial-seo="true">${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" data-initial-seo="true" />`,
    metadata.url && `<link rel="canonical" href="${escapeHtml(metadata.url)}" data-initial-seo="true" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" data-initial-seo="true" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" data-initial-seo="true" />`,
    '<meta property="og:type" content="website" data-initial-seo="true" />',
    metadata.url && `<meta property="og:url" content="${escapeHtml(metadata.url)}" data-initial-seo="true" />`,
    metadata.image && `<meta property="og:image" content="${escapeHtml(metadata.image)}" data-initial-seo="true" />`,
    metadata.imageAlt && `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" data-initial-seo="true" />`,
    '<meta property="og:locale" content="ru_RU" data-initial-seo="true" />',
    `<meta name="twitter:card" content="${metadata.twitterCard ?? 'summary'}" data-initial-seo="true" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" data-initial-seo="true" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" data-initial-seo="true" />`,
    metadata.image && `<meta name="twitter:image" content="${escapeHtml(metadata.image)}" data-initial-seo="true" />`,
  ].filter((tag): tag is string => Boolean(tag))

  return [seoStartMarker, ...tags.map((tag) => `    ${tag}`), `    ${seoEndMarker}`].join('\n')
}

const staticSeoPages = (): Plugin => {
  let outputDirectory = resolve(process.cwd(), 'dist')

  return {
    name: 'static-route-seo-pages',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const templatePath = resolve(outputDirectory, 'index.html')
      const template = await readFile(templatePath, 'utf8')
      const markerPattern = /<!-- ROUTE_SEO_START -->[\s\S]*?<!-- ROUTE_SEO_END -->/

      if (!markerPattern.test(template)) {
        throw new Error('Could not find the route SEO markers in the built index.html.')
      }

      const writePage = async (fileName: string, metadata: SeoMetadata) => {
        const html = template.replace(markerPattern, renderSeoTags(metadata))
        await writeFile(resolve(outputDirectory, fileName), html, 'utf8')
      }

      for (const [route, metadata] of Object.entries(routeSeo)) {
        const fileName = route === '/' ? 'index.html' : `${route.slice(1)}.html`
        await writePage(fileName, metadata)
      }

      await writePage('404.html', notFoundSeo)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), staticSeoPages()],
  server: {
    port: 3000
  }
})
