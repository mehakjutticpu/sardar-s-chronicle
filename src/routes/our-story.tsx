import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { StoryTimeline } from '@/components/story-content';
import { storyHead } from '@/lib/story';
import { Button } from '@/components/ui/button';
import { SweetMemories } from '@/components/sweet-memories';

export const Route = createFileRoute('/our-story')({
  head: () => storyHead('Sardar RDX and Mano: Our Complete Love Story', 'Read Shah’s personal account of meeting Mano on Facebook, their year together, the name she gave him, and the misunderstanding on 3 October 2026.', '/our-story'),
  component: OurStory,
});
function OurStory() { return <div className="inner-page"><div className="page-intro"><p className="eyebrow">SARDAR RDX & MANO</p><h1>Humari <em>kahani.</em></h1><p>Ek Facebook message se shuru hui. Aur dil mein hamesha ke liye reh gayi.</p></div><StoryTimeline /><SweetMemories /><div className="story-ending"><h2>Ek ghalat fehmi.<br /><em>Mohabbat ab bhi wahi.</em></h2><p>Main aaj bhi tumhare intezaar mein hoon, Mano. Yeh kahani meri zubaani hai — mere ehsaas, meri yaadein, aur meri dil se maafi.</p><Button asChild className="rose-button"><Link to="/for-mano">Mera paigham, tumhare naam <ArrowUpRight /></Link></Button></div></div>; }