import { describe, expect, test } from 'vitest';
import { areDigitsEven } from '../even-digits';

describe('even-digit', () => {
  describe('one-digit', () => {
    test.each([
      { input: 0, expected: true },
      { input: 1, expected: true },
    ])('given $input expected $expected', ({ input, expected }) => {
      expect(areDigitsEven(input)).toBe(expected);
    });
  });
});
