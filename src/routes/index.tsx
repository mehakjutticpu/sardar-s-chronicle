import { ClientOnly, Link, createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StoryTimeline, Letter, BotFeature } from '@/components/story-content';
import { storyHead } from '@/lib/story';
import { SweetMemories } from '@/components/sweet-memories';
import roses from '@/assets/roses.jpg';

const Petals = lazy(() => import('@/components/petals'));
export const Route = createFileRoute('/')({
  head: () => storyHead('Sardar RDX & Mano — A Love Story, Still Being Written', 'Sardar RDX, also known as Shah, tells his love story with Mano: their Facebook meeting on 10 September 2025, Mano Bot, and a heartfelt apology.', '/'),
  component: Index,
});
function Index() {
  return <>
    <section className="hero">
      <img className="hero-roses" src={roses} alt="Deep red and blush roses, a dedication to Mano" width={1920} height={1024} fetchPriority="high" />
      <ClientOnly fallback={null}><Suspense fallback={null}><Petals /></Suspense></ClientOnly>
      <div className="hero-content"><p className="eyebrow hero-eyebrow"><span /> SOME CONNECTIONS ARE WRITTEN IN THE STARS</p><h1>Sardar <span className="hero-ampersand">&</span><br /><em>Mano</em><span className="hero-heart">♡</span></h1><p className="hero-subtitle">Ek mulaqat. Ek mohabbat. Ek adhuri kahani.</p><p className="hero-description">Tumne mujhe Shah banaya.<br />Aur maine apni duniya tumhare naam kar di.</p><div className="hero-actions"><Button asChild className="rose-button"><Link to="/our-story">Our love story <ArrowUpRight /></Link></Button><Button asChild variant="ghost" className="hero-letter-link"><Link to="/for-mano"><Heart size={16} /> A letter for Mano</Link></Button></div><div className="hero-dedication"><span className="tiny-heart">♡</span><span>For the one who will always be my person.</span></div></div>
      <div className="hero-bottom"><span>EST. 10 SEPTEMBER 2025</span><a href="#beginning" aria-label="Scroll to the beginning"><ArrowDown size={16} /></a><span>ONE LOVE. ALWAYS.</span></div>
    </section>
    <section className="opening-section" id="beginning"><div className="section-kicker"><span /> THE BEGINNING OF EVERYTHING <span /></div><h2>Facebook par mile thay.<br /><em>Dil mein reh gaye.</em></h2><p>10 September 2025. Ek chhoti si mulaqat, aur zindagi ki sab se badi mohabbat.<br />Yeh kahani Sardar RDX ki hai — aur uski Mano ki.</p><div className="memory-strip"><div><span>10.09.2025</span><small>THE DAY WE MET</small></div><Heart size={20} strokeWidth={1} /><div><span>Sardar → Shah</span><small>THE NAME YOU GAVE ME</small></div><Heart size={20} strokeWidth={1} /><div><span>Sirf tum.</span><small>THEN. NOW. ALWAYS.</small></div></div></section>
    <section className="story-section"><div className="section-heading"><div><p className="eyebrow">THE CHAPTERS OF US</p><h2>Humari <em>kahani.</em></h2></div><Link to="/our-story" className="text-link">Every chapter <ArrowUpRight size={16} /></Link></div><StoryTimeline /></section>
    <div className="quote-band"><span>“</span><blockquote>Duniya mujhe Sardar kehti thi.<br /><em>Tumne Shah kaha, aur main tumhara ho gaya.</em></blockquote><p>— SARDAR RDX</p></div>
    <SweetMemories /><Letter /><BotFeature />
  </>;
}
