import { ClientOnly, Link } from '@tanstack/react-router';
import { Heart, Instagram, MessageCircle, ArrowUpRight, Menu, X, Music2 } from 'lucide-react';
import logoMark from '../assets/logo-monogram.png';
import { lazy, Suspense, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { story } from '@/lib/story';
import { BackgroundMusic, type MusicPlayerHandle } from '@/components/background-music';

const links = [{ to: '/', label: 'Home' }, { to: '/our-story', label: 'Our Story' }, { to: '/for-mano', label: 'For Mano' }, { to: '/mano-bot', label: 'Mano Bot' }] as const;
const Petals = lazy(() => import('@/components/petals'));
function SocialContacts({ location }: { location: 'top' | 'bottom' }) {
  return <div className={`social-contacts social-${location}`}><Button asChild className="contact-whatsapp"><a href={story.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a></Button><Button asChild variant="outline" className="contact-instagram"><a href={story.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Instagram</a></Button></div>;
}
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);
  return <>
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="Sardar and Mano home"><img src={logoMark} alt="Mano & Sardar logo" width={58} height={58} loading="lazy" /><span className="wordmark-caption">A STORY, STILL BEING WRITTEN</span></Link>
      <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>{link.label}</Link>)}<Button variant="outline" className="nav-play-song" onClick={() => { setOpen(false); musicRef.current?.start(); }}><Music2 size={15} /> Play Song</Button></nav>
      <SocialContacts location="top" />
      <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </header>
    <ClientOnly fallback={null}><Suspense fallback={null}><Petals /></Suspense></ClientOnly>
    <main>{children}</main>
    <footer className="site-footer"><Link to="/" className="footer-brand">Sardar <span>&</span> Mano</Link><p>Har kahani ka anjaam nahi hota. Kuch mohabbatein hamesha rehti hain.</p><SocialContacts location="bottom" /><small>Written with love, by Shah. <Heart size={11} /></small></footer>
    <Button asChild className="floating-whatsapp" size="icon"><a href={story.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sardar RDX" title="WhatsApp Sardar RDX"><MessageCircle /></a></Button>
    <BackgroundMusic ref={musicRef} />
  </>;
}