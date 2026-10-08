<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep relationship facts and contact destinations in a shared browser-safe story module so pages and factual tests use one consistent source.
- Keep the decorative Three.js scene dynamically imported behind ClientOnly; all story text remains server-rendered for accessibility and search crawlers.
- Use separate content routes for the complete story, personal letter, and bot, each with unique metadata and structured author information.
- Keep uploaded memory photos in a shared album component using Lovable Assets pointers, so the home and story albums stay consistent without committing binaries.
