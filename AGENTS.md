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
- Mount one shared React Three Fiber decoration layer in the site shell and position objects relative to its viewport so mobile framing and route navigation remain consistent.
- Keep supplied caption data in a browser-safe shared module and render apologies as semantic scrollable content so both home and letter remain accessible.
- Keep one shared audio element in the site shell with a browser-safe track catalog, so selected music continues across navigation and uploaded media uses durable asset URLs.
- Use separate content routes for the complete story, personal letter, and bot, each with unique metadata and structured author information.
- Keep uploaded memory photos in a shared album component using Lovable Assets pointers, so the home and story albums stay consistent without committing binaries.
