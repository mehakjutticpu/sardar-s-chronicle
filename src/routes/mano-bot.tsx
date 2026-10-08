import { createFileRoute } from '@tanstack/react-router';
import { BotFeature } from '@/components/story-content';
import { storyHead } from '@/lib/story';
export const Route = createFileRoute('/mano-bot')({
  head: () => storyHead('Mano Bot — Messenger & WhatsApp Bot by Sardar RDX', 'Meet Mano Bot, the Messenger and WhatsApp creation of Pakistani programmer and vibe coder Sardar RDX. Named after Mano, its creator reports users in 10 countries.', '/mano-bot'),
  component: ManoBot,
});
function ManoBot() { return <div className="inner-page"><div className="page-intro"><p className="eyebrow">CREATED BY SARDAR RDX</p><h1>Mano <em>Bot.</em></h1><p>Ek programmer ki mehnat. Ek mohabbat ka naam.</p></div><BotFeature full /><div className="bot-note"><p>“Pakistan ka sab se best bot” — meri apni mehnat par mera yaqeen.</p><small>Reach aur pehchaan ki details creator Sardar RDX ki apni maloomat par mabni hain.</small></div></div>; }