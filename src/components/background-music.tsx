import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackgroundMusic() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.volume = 0.5;
    const start = () => { if (!muted) audio.play().then(() => setPlaying(true)).catch(() => {}); };
    start();
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    const onFirst = () => { start(); events.forEach(e => window.removeEventListener(e, onFirst)); };
    events.forEach(e => window.addEventListener(e, onFirst, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, onFirst));
  }, [muted]);

  const toggle = () => {
    const audio = ref.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); setMuted(true); }
    else { setMuted(false); audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return <>
    <audio ref={ref} src="/music/background.mp3" loop preload="auto" />
    <Button variant="outline" size="icon" onClick={toggle} aria-label={playing ? 'Music band karo' : 'Music chalao'} title={playing ? 'Music band karo' : 'Music chalao'} style={{ position: 'fixed', left: 18, bottom: 18, zIndex: 60, borderRadius: 999 }}>
      {playing ? <Volume2 /> : <VolumeX />}
    </Button>
  </>;
}
