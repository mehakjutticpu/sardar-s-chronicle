import { useEffect, useRef, useState } from 'react';
import { Heart, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import captions from '@/lib/love-captions.json';

const styles = ['classic', 'script', 'outline', 'bold', 'spaced', 'soft', 'italic', 'smallcaps'];
export const sorryEntries = Array.from({ length: 1000 }, (_, index) => ({ number: index + 1, style: styles[index % styles.length] }));

export function LoveNotes() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [count, setCount] = useState(1);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPlaying(false); return; }
    const timer = window.setInterval(() => setActive(previous => (previous + 1) % captions.length), 11000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const element = scroll.current;
    if (!element || !playing) return;
    let frame = 0;
    let previous = 0;
    const tick = (time: number) => {
      if (previous) element.scrollTop += Math.min((time - previous) / 1000, .05) * 23;
      previous = time;
      if (element.scrollTop >= element.scrollHeight - element.clientHeight - 1) { setPlaying(false); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  return <section className="love-notes" aria-labelledby="love-notes-title">
    <div className="section-kicker"><span /> SIRF MANO KE NAAM <span /></div>
    <h2 id="love-notes-title">Har lafz mein <em>tum.</em></h2>
    <div className="caption-stage">
      <Heart className="caption-heart" strokeWidth={1} aria-hidden="true" />
      <blockquote key={active} className="love-caption" dir="auto">{captions[active]}</blockquote>
      <div className="caption-pages" aria-label="Caption selection">{Array.from({ length: Math.ceil(captions.length / 5) }, (_, index) => <Button key={index} size="icon" variant="ghost" aria-label={`Show caption ${index * 5 + 1}`} aria-pressed={Math.floor(active / 5) === index} onClick={() => setActive(index * 5)}><span /></Button>)}</div>
    </div>
    <div className="sorry-heading"><div><p className="eyebrow">EK DIL. HAZAAR MAAFIYAN.</p><h3>Mano, <em>I’m sorry.</em></h3></div><div className="sorry-controls"><span>{String(count).padStart(4, '0')} / 1000</span><Button variant="outline" size="icon" aria-label={playing ? 'Pause Sorry list' : 'Play Sorry list'} title={playing ? 'Pause Sorry list' : 'Play Sorry list'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16} /> : <Play size={16} />}</Button></div></div>
    <div ref={scroll} className="sorry-scroll" tabIndex={0} role="region" aria-label="1000 apologies for Mano" onPointerDown={() => setPlaying(false)} onWheel={() => setPlaying(false)} onKeyDown={() => setPlaying(false)} onScroll={event => setCount(Math.min(1000, Math.floor(event.currentTarget.scrollTop / 76) + 1))}>
      <ol>{sorryEntries.map(entry => <li key={entry.number} className={`sorry-row sorry-${entry.style}`}><span className="sorry-number">{String(entry.number).padStart(4, '0')}</span><span className="sorry-word">Sorry{entry.number % 3 === 0 ? ', Mano' : ''}</span><Heart size={16} strokeWidth={1} aria-hidden="true" /></li>)}</ol>
    </div>
    <p className="sorry-signature">Har baar, dil se. <span>— Tumhara Shah ♡</span></p>
  </section>;
}