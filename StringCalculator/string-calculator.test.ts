import { describe, expect, test } from 'vitest';
import { stringCalculator } from '../string-calculator';

describe('string-calculator', () => {
  describe('add', () => {
    test('given an empty string return 0', () => {
      const input = '';
      const expected = 0;
      const sut = new stringCalculator();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });

    // test('given single number should return that number', () => {
    //   const input = '5';
    //   const expected = 5;
    //   const sut = new stringCalculator();

    //   const actual = sut.add(input);

    //   expect(actual).toBe(expected);
    // });

    describe('two numbers', () => {
      test.each([
        {
          input: '6,3',
          expected: 9,
        },
        {
          input: '10,23',
          expected: 33,
        },
        {
          input: '234,754',
          expected: 988,
        },
      ])(
        'given single $input should return $expected',
        ({ input, expected }) => {
          const sut = new stringCalculator();

          const actual = sut.add(input);

          expect(actual).toBe(expected);
        }
      );
    });

    describe('single number', () => {
      test.each([
        {
          input: '5',
          expected: 5,
        },
      ])(
        'given single $input should return $expected',
        ({ input, expected }) => {
          const sut = createSut();

          const actual = sut.add(input);

          expect(actual).toBe(expected);
        }
      );
    });

    test('learning test', () => {
      expect('1,2,3'.split(',')).toEqual(['1', '2', '3']);
      expect(['1', '2', '3'].map((x) => parseInt(x))).toEqual([1, 2, 3]);
      expect([1, 2, 3].reduce((acc, x) => acc + x, 0)).toBe(6);
    });
  });
});
function createSut() {
  return new stringCalculator();
}
