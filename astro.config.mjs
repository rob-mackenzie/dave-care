// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { youtubeEmbeds } from './src/plugins/youtube-embeds.mjs';

export default defineConfig({
  markdown: {
    processor: satteri({ mdastPlugins: [youtubeEmbeds] }),
  },
  image: {
    // Phone photos are huge: make smaller copies so phones load the right size.
    layout: 'constrained',
  },
});
