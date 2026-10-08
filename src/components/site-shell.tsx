import { Link } from '@tanstack/react-router';
import { Heart, Instagram, MessageCircle, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { story } from '@/lib/story';

const links = [{ to: '/', label: 'Home' }, { to: '/our-story', label: 'Our Story' }, { to: '/for-mano', label: 'For Mano' }, { to: '/mano-bot', label: 'Mano Bot' }] as const;
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="Sardar and Mano home">S<span className="wordmark-heart">♡</span>M<span className="wordmark-caption">A STORY, STILL BEING WRITTEN</span></Link>
      <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>{link.label}</Link>)}</nav>
      <Button asChild variant="outline" className="header-cta"><Link to="/for-mano"><Heart /> A letter for you <ArrowUpRight /></Link></Button>
      <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><Link to="/" className="footer-brand">Sardar <span>&</span> Mano</Link><p>Har kahani ka anjaam nahi hota. Kuch mohabbatein hamesha rehti hain.</p><div className="footer-links"><a href={story.instagram} target="_blank" rel="noopener noreferrer" aria-label="Sardar RDX on Instagram"><Instagram size={18} /></a><a href={story.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message Sardar RDX on WhatsApp"><MessageCircle size={18} /></a></div><small>Written with love, by Shah. <Heart size={11} /></small></footer>
    <Button asChild className="floating-whatsapp" size="icon"><a href={story.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sardar RDX" title="WhatsApp Sardar RDX"><MessageCircle /></a></Button>
  </>;
}