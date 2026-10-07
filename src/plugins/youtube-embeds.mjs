// Turns a YouTube link that sits on its own line in Markdown into an
// embedded video player. Links inside a sentence are left alone.

const YOUTUBE =
  /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/;

// "90", "90s" or "1m30s" -> 90
function toSeconds(value) {
  if (!value) return 0;
  if (/^\d+s?$/.test(value)) return parseInt(value, 10);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;
  const [, h = 0, m = 0, s = 0] = match;
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

/** @type {import('satteri').MdastPluginDefinition} */
export const youtubeEmbeds = {
  name: 'youtube-embeds',
  paragraph(node, ctx) {
    if (node.children.length !== 1) return;
    const [link] = node.children;
    if (link.type !== 'link' || ctx.textContent(link).trim() !== link.url) return;

    const id = link.url.match(YOUTUBE)?.[1];
    if (!id) return;

    const params = new URL(link.url).searchParams;
    const start = toSeconds(params.get('t') ?? params.get('start'));
    const src = `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ''}`;

    ctx.replaceNode(node, {
      type: 'html',
      value:
        `<div class="video"><iframe src="${src}" title="YouTube video" loading="lazy" ` +
        `allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
        `referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`,
    });
  },
};
