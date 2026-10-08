import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
const callTogether = { url: '/memories/memory-01.jpeg' };
const groupCall = { url: '/memories/memory-02.jpeg' };
const sardarFlowers = { url: '/memories/memory-03.jpeg' };
const manoFlowers = { url: '/memories/memory-04.jpeg' };
const profiles = { url: '/memories/memory-05.jpeg' };
const stories = { url: '/memories/memory-06.jpeg' };
const manoBlue = { url: '/memories/memory-07.jpeg' };
const sardarBlue = { url: '/memories/memory-08.jpeg' };
const sardar = { url: '/memories/memory-09.jpeg' };
const mano = { url: '/memories/memory-10.jpeg' };

const memories = [
  { asset: sardar, title: 'Sardar', caption: 'Shah ke naam se.' },
  { asset: mano, title: 'Mano', caption: 'Meri sab se khaas yaad.' },
  { asset: sardarBlue, title: 'Sardar · Soulmate', caption: 'Ek rang, do dil.' },
  { asset: manoBlue, title: 'Mano · Soulmate', caption: 'Wohi rang, wohi mohabbat.' },
  { asset: sardarFlowers, title: 'Sardar · Gulab', caption: 'Tumhare naam.' },
  { asset: manoFlowers, title: 'Mano · Gulab', caption: 'Mohabbat ki ek tasveer.' },
  { asset: profiles, title: 'Humare profiles', caption: 'Naam alag, kahani ek.' },
  { asset: stories, title: 'Chhoti chhoti yaadein', caption: 'Woh purane din.' },
  { asset: groupCall, title: 'Call ki yaadein', caption: 'Saath guzre lamhe.' },
  { asset: callTogether, title: 'Ek aur yaad', caption: 'Dil ke qareeb.' },
  { asset: { url: '/memories/memory-11.jpeg' }, title: 'Sardar', caption: 'Meri zindagi ka khoobsurat ehsaas.' },
  { asset: { url: '/memories/memory-12.jpeg' }, title: 'Mano', caption: 'Aap ho jana.' },
  { asset: { url: '/memories/memory-13.jpeg' }, title: 'Sardar & Mano', caption: 'Haath mein haath.' },
  { asset: { url: '/memories/memory-14.jpeg' }, title: 'Group call', caption: 'Sab saath saath.' },
  { asset: { url: '/memories/memory-15.jpeg' }, title: 'Profiles', caption: 'Do naam, ek kahani.' },
  { asset: { url: '/memories/memory-16.jpeg' }, title: 'Call par', caption: 'Baatein hi baatein.' },
  { asset: { url: '/memories/memory-17.jpeg' }, title: 'Lambi call', caption: '58 minute ki yaad.' },
  { asset: { url: '/memories/memory-18.jpeg' }, title: 'Chat ki yaadein', caption: 'Hansi aur shararat.' },
  { asset: { url: '/memories/memory-19.jpeg' }, title: 'Mano ka profile', caption: 'Angel & Devil.' },
  { asset: { url: '/memories/memory-20.jpeg' }, title: 'Sardar ka profile', caption: 'Fadebaz Sardar.' },
];

export function SweetMemories() {
  const [selected, setSelected] = useState<number | null>(null);
  const section = useRef<HTMLElement>(null);
  const current = selected === null ? undefined : memories[selected];
  const step = (direction: number) => setSelected(index => index === null ? null : (index + direction + memories.length) % memories.length);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add('memories-visible');
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelected(index => index === null ? null : (index + (event.key === 'ArrowRight' ? 1 : -1) + memories.length) % memories.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return <section ref={section} className="sweet-memories" aria-labelledby="memories-title">
    <div className="memories-heading"><p className="section-kicker"><span /> DIL MEIN MEHFOOZ <span /></p><h2 id="memories-title">Sweet <em>memories.</em></h2><p>Kuch tasveerein. Beshumaar ehsaas.</p><Heart size={19} strokeWidth={1} /></div>
    <div className="memories-grid">{memories.map((memory, index) => <figure className="memory-photo" key={memory.asset.asset_id}>
      <Button variant="ghost" className="memory-image-button" onClick={() => setSelected(index)} aria-label={`Open memory: ${memory.title}`}>
        <img src={memory.asset.url} alt={memory.title} loading="lazy" width={640} height={640} />
        <span className="memory-expand"><Expand size={18} /></span>
      </Button>
      <figcaption><span>{memory.title}</span><small>{memory.caption}</small></figcaption>
    </figure>)}</div>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="memory-lightbox">
        <DialogTitle>{current?.title ?? 'Sweet memories'}</DialogTitle>
        <DialogDescription className="sr-only">{current?.caption}</DialogDescription>
        {current && <img key={current.asset.asset_id} className="memory-full-image" src={current.asset.url} alt={current.title} />}
        <div className="memory-lightbox-controls">
          <Button variant="outline" size="icon" onClick={() => step(-1)} aria-label="Previous memory" title="Previous memory"><ArrowLeft /></Button>
          <p aria-live="polite">{selected === null ? 0 : selected + 1} / {memories.length}<span>{current?.caption}</span></p>
          <Button variant="outline" size="icon" onClick={() => step(1)} aria-label="Next memory" title="Next memory"><ArrowRight /></Button>
        </div>
      </DialogContent>
    </Dialog>
  </section>;
}