import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoryTimeline, Letter, BotFeature } from '@/components/story-content';
import { storyHead } from '@/lib/story';
import { SweetMemories } from '@/components/sweet-memories';
import roses from '@/assets/roses.jpg';
import { LoveNotes } from '@/components/love-notes';

export const Route = createFileRoute('/')({
  head: () => {
    const h = storyHead('Who is Sardar and Mano? — Sardar RDX & Mano Love Story', 'Who is Sardar and Mano? Sardar RDX (Shah) and Mano met on Facebook on 10 September 2025. Read the Sardar and Mano love story, photos, letter and Mano Bot.', '/');
    h.meta.push({ name: 'keywords', content: 'who is sardar and mano, sardar and mano, sardar rdx, mano, sardar mano love story, mano bot, shah and mano' });
    h.scripts.push({ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }) });
    return h;
  },
  component: Index,
});
const faqs: [string, string][] = [
  ['Who is Sardar and Mano?', 'Sardar and Mano are a couple. Sardar RDX, also called Shah, and Mano met on Facebook on 10 September 2025. This website is their love story, written by Sardar for Mano.'],
  ['Who is Sardar RDX?', 'Sardar RDX is the creator of this website and of Mano Bot, a Facebook Messenger bot. Mano gave him the name Shah.'],
  ['Who is Mano?', 'Mano is the love of Sardar RDX. This site, its letter, its photos and Mano Bot are all dedicated to her.'],
  ['When did Sardar and Mano meet?', 'Sardar and Mano met on Facebook on 10 September 2025.'],
];
function Index() {
  return <>
    <section className="hero">
      <img className="hero-roses" src={roses} alt="Deep red and blush roses, a dedication to Mano" width={1920} height={1024} fetchPriority="high" />
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span /> SOME CONNECTIONS ARE WRITTEN IN THE STARS</p><h1>Sardar <span className="hero-ampersand">&</span><br /><em>Mano</em><span className="hero-heart">♡</span></h1><p className="hero-subtitle">Ek mulaqat. Ek mohabbat. Ek adhuri kahani.</p><p className="hero-description">Tumne mujhe Shah banaya.<br />Aur maine apni duniya tumhare naam kar di.</p><div className="hero-actions"><Button asChild className="rose-button"><Link to="/our-story">Our love story <ArrowUpRight /></Link></Button><Button asChild variant="ghost" className="hero-letter-link"><Link to="/for-mano"><Heart size={16} /> A letter for Mano</Link></Button></div><div className="hero-dedication"><span className="tiny-heart">♡</span><span>For the one who will always be my person.</span></div></div>
      <div className="hero-bottom"><span>EST. 10 SEPTEMBER 2025</span><a href="#beginning" aria-label="Scroll to the beginning"><ArrowDown size={16} /></a><span>ONE LOVE. ALWAYS.</span></div>
    </section>
    <section className="opening-section" id="beginning"><div className="section-kicker"><span /> THE BEGINNING OF EVERYTHING <span /></div><h2>Facebook par mile thay.<br /><em>Dil mein reh gaye.</em></h2><p>10 September 2025. Ek chhoti si mulaqat, aur zindagi ki sab se badi mohabbat.<br />Yeh kahani Sardar RDX ki hai — aur uski Mano ki.</p><div className="memory-strip"><div><span>10.09.2025</span><small>THE DAY WE MET</small></div><Heart size={20} strokeWidth={1} /><div><span>Sardar → Shah</span><small>THE NAME YOU GAVE ME</small></div><Heart size={20} strokeWidth={1} /><div><span>Sirf tum.</span><small>THEN. NOW. ALWAYS.</small></div></div></section>
    <section className="story-section"><div className="section-heading"><div><p className="eyebrow">THE CHAPTERS OF US</p><h2>Humari <em>kahani.</em></h2></div><Link to="/our-story" className="text-link">Every chapter <ArrowUpRight size={16} /></Link></div><StoryTimeline /></section>
    <div className="quote-band"><span>“</span><blockquote>Duniya mujhe Sardar kehti thi.<br /><em>Tumne Shah kaha, aur main tumhara ho gaya.</em></blockquote><p>— SARDAR RDX</p></div>
    <SweetMemories /><LoveNotes /><Letter /><BotFeature />
    <section className="story-section" aria-labelledby="faq-title"><p className="eyebrow">SARDAR & MANO</p><h2 id="faq-title">Who is <em>Sardar and Mano?</em></h2>{faqs.map(([q, a]) => <div key={q} style={{ marginTop: '1.5rem' }}><h3>{q}</h3><p>{a}</p></div>)}</section>
  </>;
}
