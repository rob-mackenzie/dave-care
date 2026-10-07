# Caring for Dave

A small website for Dave's carers. It has the morning and evening visit checklists, fixes for common problems, and who to call.

Everything on the site is written in Markdown in [`src/content`](src/content). When you change a file on GitHub, Cloudflare rebuilds the site and it's live a minute or two later.

## Where things are

| What | File |
| --- | --- |
| Home page (and the site name) | [`src/content/pages/home.md`](src/content/pages/home.md) |
| Morning visit checklist | [`src/content/pages/morning.md`](src/content/pages/morning.md) |
| Evening visit checklist | [`src/content/pages/evening.md`](src/content/pages/evening.md) |
| Intro to the problems page | [`src/content/pages/problems.md`](src/content/pages/problems.md) |
| Each common problem | [`src/content/problems/`](src/content/problems) (one file each) |
| Who to call | [`src/content/pages/contacts.md`](src/content/pages/contacts.md) |
| Photos | [`src/content/photos/`](src/content/photos) |

Anything in `[square brackets]` is a placeholder for you to fill in. Before telling the carers about the site, search each file for `[` to check you haven't missed any.

## Editing on GitHub

1. Open the file on github.com and click the pencil icon (**Edit this file**).
2. Make your changes. The **Preview** tab shows roughly how they'll look.
3. Click **Commit changes**.

The site updates a minute or two later. If a change breaks the build, the old version stays live. GitHub shows a red cross next to your change, and the build log in the Cloudflare dashboard says what went wrong.

This works in a phone browser too.

## Writing pages

Each file starts with a short header between `---` lines, then the content:

```md
---
title: Morning visit
description: What to do on the morning visit
menu: Morning
order: 2
---

## When you arrive

- [ ] Knock and call out before letting yourself in
```

- **title**: the heading at the top of the page.
- **description**: the line under the page's button on the home page.
- **menu**: the label in the top menu. Leave it out to hide the page from the menu.
- **order**: where it goes in the menu and on the home page (1 is first).

To add a new page, create a new `.md` file in `src/content/pages`. Its file name becomes the web address, so `about-dave.md` appears at `/about-dave/`.

### Checklists

Start a line with `- [ ] ` to make a tick box:

```md
- [ ] Give his morning tablets
- [ ] Fill in the MAR chart
```

Carers can tap the boxes as they go. The ticks are saved only on their own phone, and they clear the next day. A plain bullet (`- `) shows a normal list with no tick box.

### Common problems

Each problem has its own file in `src/content/problems`. To add one, use **Add file → Create new file** in that folder and name it something like `cant-find-glasses.md`:

```md
---
title: Dave can't find his glasses
order: 6
---

1. Check the table next to his chair
2. ...
```

`order` sets its place in the list. Put the most common problems first.

### Formatting

| You type | You get |
| --- | --- |
| `## Heading` | A section heading |
| `**bold**` | **bold** |
| `1. Step` | A numbered list |
| `- Item` | A bullet list |
| `[see who to call](/contacts/)` | A link to another page |
| `[07700 900123](tel:07700900123)` | A phone number people can tap to call |
| `> Important note` | A highlighted box |

### Photos

1. Go to [`src/content/photos`](src/content/photos) and use **Add file → Upload files**.
2. In the page, add: `![What the photo shows](../photos/your-photo.jpg)`

Use JPG or PNG files with lower-case names and no spaces (e.g. `tv-remote.jpg`). The site shrinks photos for phones automatically, so you don't need to resize them. iPhone HEIC photos won't work, so convert them to JPG first.

### YouTube videos

Paste the video's link on a line of its own and it becomes a video player:

```md
Here's how to use the remote:

https://www.youtube.com/watch?v=VIDEO_ID
```

`youtu.be/...` short links and links with a start time (`&t=90`) work too. A YouTube link inside a sentence stays a normal link. Unlisted YouTube videos work, which is useful for showing how to use Dave's own TV or heating.

## Privacy

This site is public: anyone who has the address can read it. Search engines are asked not to list it, but that isn't real protection. So:

- **Never** put the key safe code, bank or card details, or passwords on it.
- Think twice about his full address and medication doses. The MAR chart in the house should stay the record for medication.

If you'd like a password on it, Cloudflare Access (in **Zero Trust**, free for up to 50 people) can require a code sent by email before anyone can see the site.

## Setting up Cloudflare (one time)

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to **Workers & Pages → Create → Import a repository**.
2. Connect GitHub and choose the `dave-care` repository.
3. Settings:
   - **Project name:** `dave-care`. This must match `name` in [`wrangler.jsonc`](wrangler.jsonc).
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (the default)
4. Click **Save and Deploy**.

The site will then be at `https://dave-care.<your-subdomain>.workers.dev`. To use your own domain, go to the Worker's **Settings → Domains & Routes → Add → Custom domain**. The domain has to be managed by Cloudflare.

Everything here fits in Cloudflare's free plan.

## Working on your computer (optional)

You need [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install
npm run dev       # preview at http://localhost:4321, updates as you save
npm run build     # build the site into dist/
npm run preview   # build, then serve it the way Cloudflare will
```

## How it's built

- [Astro](https://astro.build) turns the Markdown into a static site.
- [`src/plugins/youtube-embeds.mjs`](src/plugins/youtube-embeds.mjs) turns YouTube links into video players.
- [`src/layouts/Base.astro`](src/layouts/Base.astro) is the page template and makes the tick boxes tappable.
- [`src/styles/site.css`](src/styles/site.css) holds all the styling. Text is large and the layout is built for phones, with a clean print version.
- Cloudflare Workers hosts the built files from `dist/`, as set in [`wrangler.jsonc`](wrangler.jsonc).
