import { describe, expect, it } from 'vitest';
import { story } from '@/lib/story';

describe('User-provided story facts', () => {
  it('records the first meeting on 10 September 2025', () => { expect(story.met).toBe('2025-09-10'); });
  it('records the last message on 3 October 2026 at 8:36 PM', () => { expect(story.lastMessage).toBe('2026-10-03T20:36:00+05:00'); });
  it('links to the supplied WhatsApp number', () => { expect(story.whatsapp).toBe('https://wa.me/923301068874'); });
  it('records the stated reach of ten countries', () => { expect(story.countries).toBe(10); });
});