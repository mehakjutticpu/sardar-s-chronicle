import { describe, expect, it } from 'vitest';
import { sorryEntries } from '@/components/love-notes';
import captions from '@/lib/love-captions.json';

describe('Romantic notes', () => {
  it('contains exactly 1000 consecutively numbered apologies', () => {
    expect(sorryEntries).toHaveLength(1000);
    expect(sorryEntries[0].number).toBe(1);
    expect(sorryEntries[999].number).toBe(1000);
    expect(new Set(sorryEntries.map(entry => entry.style)).size).toBe(8);
  });
  it('keeps the supplied captions in one shared collection', () => {
    expect(captions.length).toBeGreaterThan(30);
    expect(captions.some(caption => caption.includes('MY SAFE PLACE'))).toBe(true);
  });
});