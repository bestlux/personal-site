# Music

Add one `.mdx` file per song, playlist, or listening essay. Entries appear on the website when `notesPublished` is true. This repository is public: committed drafts are visible on GitHub regardless of that flag. Keep private drafts outside the repository.

```yaml
---
slug: your-note-title
title: Your note title
artist: Artist name
listenUrl: https://open.spotify.com/...
updatedAt: "2026-09-05"
notesPublished: false
---
```

Write your thoughts below the frontmatter using Markdown. `artist` and `listenUrl` are optional. A published entry needs writing, a listening link, or both. Links open the music service; there is no autoplay or embedded player.

The index lives at `/music`; each published note has its own `/music/your-note-title` URL. Headings, paragraphs, quotes, lists, links, images, and code blocks use the same long-form layout as Reading.
