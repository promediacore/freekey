import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    adapter: adapter({
      pages: 'public',
      assets: 'public',
      fallback: null,
      precompress: false
    })
	},
  tailingSlash: 'always',
  prerender: {
    default: true
  },
  preprocess: [
    preprocess({
      postcss: true,
    })
  ]
};

export default config
