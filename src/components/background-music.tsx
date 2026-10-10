import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music2, X, Play, Pause, SkipBack, SkipForward, Repeat, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import tracks from '@/lib/music-tracks.json';

const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
export function BackgroundMusic() {
  const ref = useRef<HTMLAudioElement>(null);
  const wantsPlay = useRef(true);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(.5);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [error, setError] = useState('');
  const track = tracks[index];
  const play = () => {
    const audio = ref.current;
    if (!audio) return;
    wantsPlay.current = true;
    audio.play().catch(() => setError('Play dabayein; agar audio na chale to doosra track select karein.'));
  };
  const select = (next: number) => {
    wantsPlay.current = true;
    setError('');
    if (next === index) { play(); return; }
    setPosition(0); setDuration(0); setIndex((next + tracks.length) % tracks.length);
  };
  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.volume = .5;
    const tryStart = () => { if (wantsPlay.current) audio.play().catch(() => {}); };
    tryStart();
    const onGesture = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('.music-player, .music-dock')) return;
      tryStart();
    };
    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
    return () => { window.removeEventListener('pointerdown', onGesture); window.removeEventListener('keydown', onGesture); };
  }, []);
  useEffect(() => {
    if (wantsPlay.current) ref.current?.play().catch(() => {});
  }, [index]);
  const toggle = () => {
    if (playing) { wantsPlay.current = false; ref.current?.pause(); }
    else play();
  };
  return <>
    <audio ref={ref} src={track?.url} preload="metadata" loop={repeat} onPlay={() => { setPlaying(true); setError(''); }} onPause={() => setPlaying(false)} onTimeUpdate={event => setPosition(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onEnded={() => select(index + 1)} onError={() => setError('Yeh audio load nahi hua. Doosra track select karein.')} />
    <div className="music-dock"><Button variant="outline" size="icon" aria-label="Open music player" title="Music player" onClick={() => setOpen(!open)}><Music2 /></Button><Button variant="outline" size="icon" aria-label={muted ? 'Unmute music' : 'Mute music'} title={muted ? 'Unmute music' : 'Mute music'} onClick={() => { const next = !muted; setMuted(next); if (ref.current) ref.current.muted = next; }}>{muted ? <VolumeX /> : <Volume2 />}</Button></div>
    {open && <section className="music-player" aria-label="Music player">
      <div className="player-heading"><div><p className="eyebrow">MANO & SARDAR</p><h2>Our soundtrack</h2></div><Button variant="ghost" size="icon" aria-label="Close music player" onClick={() => setOpen(false)}><X /></Button></div>
      <div className="now-playing"><Music2 size={22} /><div><strong>{track?.title}</strong><span>{playing ? 'Playing' : 'Paused'} · {index + 1} / {tracks.length}</span></div></div>
      <input className="player-range" type="range" aria-label="Seek music" min={0} max={duration || 1} step={.1} value={Math.min(position, duration || 1)} disabled={!duration} onChange={event => { const next = Number(event.target.value); if (ref.current) ref.current.currentTime = next; setPosition(next); }} />
      <div className="player-times"><span>{timeLabel(position)}</span><span>{timeLabel(duration)}</span></div>
      <div className="player-controls"><Button variant="ghost" size="icon" aria-label="Previous track" onClick={() => select(index - 1)}><SkipBack /></Button><Button size="icon" aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggle}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" size="icon" aria-label="Next track" onClick={() => select(index + 1)}><SkipForward /></Button><Button variant={repeat ? 'secondary' : 'ghost'} size="icon" aria-label="Repeat current track" aria-pressed={repeat} title="Repeat current track" onClick={() => setRepeat(!repeat)}><Repeat /></Button></div>
      <div className="player-volume"><Volume2 size={16} /><input type="range" className="player-range" aria-label="Music volume" min={0} max={1} step={.05} value={volume} onChange={event => { const next = Number(event.target.value); setVolume(next); if (ref.current) ref.current.volume = next; }} /></div>
      {error && <p role="status" className="player-error">{error}</p>}
      <p className="tracklist-label"><ListMusic size={16} /> Tracks</p>
      <ol className="music-tracks">{tracks.map((item, next) => <li key={item.id}><Button variant="ghost" className={next === index ? 'selected-track' : ''} aria-label={`Play ${item.title}`} aria-pressed={next === index} onClick={() => select(next)}><span>{String(next + 1).padStart(2, '0')}</span><span>{item.title}</span>{next === index && playing ? <Volume2 size={15} /> : <Play size={15} />}</Button></li>)}</ol>
    </section>}
  </>;
}
