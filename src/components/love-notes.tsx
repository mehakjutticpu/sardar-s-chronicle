import { useEffect, useRef, useState } from 'react';
import { Heart, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import captions from '@/lib/love-captions.json';

const styles = ['classic', 'script', 'outline', 'bold', 'spaced', 'soft', 'italic', 'smallcaps'];
const emojis = ['🥺', '💗', '🌷', '🫶', '😭', '🦋', '💌', '🌸', '❤️', '🕊️', '💞', '🧸', '💖', '🌹', '🤍', '💫', '💕', '🥹', '🎀', '💝', '✨', '🫂', '🌙', '💐', '💟', '💓', '🙏', '😔', '💘', '🌻', '🩷', '💋'];
export const sorryEntries = Array.from({ length: 1000 }, (_, index) => ({ number: index + 1, style: styles[index % styles.length], emoji: `${emojis[index % 32]} ${emojis[Math.floor(index / 32)]}` }));

export function LoveNotes() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [count, setCount] = useState(1);
  const scroll = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const changeCaption = (step: number) => setActive(previous => (previous + step + captions.length) % captions.length);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(previous => (previous + 1) % captions.length), 4000);
    return () => window.clearInterval(timer);
  }, [active]);
  useEffect(() => {
    const element = scroll.current;
    if (!element || !playing) return;
    let frame = 0;
    let previous = 0;
    let position = element.scrollTop;
    const tick = (time: number) => {
      if (previous) {
        const max = element.scrollHeight - element.clientHeight;
        if (Math.abs(element.scrollTop - Math.round(position)) > 2) position = element.scrollTop;
        position += Math.min((time - previous) / 1000, .05) * 40;
        if (max > 0 && position >= max - 1) position = 0;
        element.scrollTop = position;
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  return <section className="love-notes" aria-labelledby="love-notes-title">
    <div className="section-kicker"><span /> SIRF MANO KE NAAM <span /></div>
    <h2 id="love-notes-title">Har lafz mein <em>tum.</em></h2>
    <div className="caption-stage" onPointerDown={event => { swipeStart.current = { x: event.clientX, y: event.clientY }; }} onPointerUp={event => { const start = swipeStart.current; swipeStart.current = null; if (!start) return; const dx = event.clientX - start.x; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(event.clientY - start.y)) changeCaption(dx < 0 ? 1 : -1); }} onPointerCancel={() => { swipeStart.current = null; }}>
      <Heart className="caption-heart" strokeWidth={1} aria-hidden="true" />
      <blockquote key={active} className="love-caption" dir="auto">{captions[active]}</blockquote>
      <div className="caption-navigation"><Button variant="ghost" size="icon" aria-label="Previous caption" onClick={() => changeCaption(-1)}><ChevronLeft /></Button><span>{active + 1} / {captions.length}</span><Button variant="ghost" size="icon" aria-label="Next caption" onClick={() => changeCaption(1)}><ChevronRight /></Button></div>
    </div>
    <div className="sorry-heading"><div><p className="eyebrow">EK DIL. HAZAAR MAAFIYAN.</p><h3>Mano, <em>I’m sorry.</em></h3></div><div className="sorry-controls"><span>{String(count).padStart(4, '0')} / 1000</span><Button variant="outline" size="icon" aria-label={playing ? 'Pause Sorry list' : 'Play Sorry list'} title={playing ? 'Pause Sorry list' : 'Play Sorry list'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16} /> : <Play size={16} />}</Button></div></div>
    <div ref={scroll} className="sorry-scroll" tabIndex={0} role="region" aria-label="1000 apologies for Mano" onPointerDown={() => setPlaying(false)} onWheel={() => setPlaying(false)} onKeyDown={() => setPlaying(false)} onScroll={event => setCount(Math.min(1000, Math.floor(event.currentTarget.scrollTop / 76) + 1))}>
      <ol>{sorryEntries.map(entry => <li key={entry.number} className={`sorry-row sorry-${entry.style}`}><span className="sorry-number">{String(entry.number).padStart(4, '0')}</span><span className="sorry-word">{entry.number % 3 === 0 ? 'Sorry, Mano' : entry.number % 3 === 1 ? 'Sorry' : 'So sorry'}<span className="sorry-emoji">{entry.emoji}</span></span></li>)}</ol>
    </div>
    <p className="sorry-signature">Har baar, dil se. <span>— Tumhara Shah ♡</span></p>
  </section>;
}