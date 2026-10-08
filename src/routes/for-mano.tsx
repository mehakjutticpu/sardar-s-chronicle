import { createFileRoute } from '@tanstack/react-router';
import { Letter } from '@/components/story-content';
import { storyHead } from '@/lib/story';
export const Route = createFileRoute('/for-mano')({
  head: () => storyHead('For Mano — A Heartfelt Apology from Shah | Sardar RDX', 'A personal letter from Sardar RDX, known as Shah, to Mano: a heartfelt apology after the 3 October 2026 misunderstanding and an invitation to talk.', '/for-mano'),
  component: ForMano,
});
function ForMano() { return <div className="letter-page"><p className="eyebrow page-date">3 OCTOBER 2026 · THE WORDS LEFT UNSAID</p><Letter full /></div>; }