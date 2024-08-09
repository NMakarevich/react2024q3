import { transformStars } from './utils.ts';
import { expect } from 'vitest';

describe('Utils', () => {
  it('Transform stars should return "0"', () => {
    const result = transformStars(undefined);
    expect(result).toBe('0');
  });
  it('Transform stars should return "500"', () => {
    const result = transformStars(500);
    expect(result).toBe('500');
  });
  it('Transform stars should return "256k"', () => {
    const result = transformStars(256432);
    expect(result).toBe('256k');
  });
});
