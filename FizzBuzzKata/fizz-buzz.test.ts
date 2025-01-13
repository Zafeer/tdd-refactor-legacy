import { describe, expect, it } from 'vitest';
import { createFizzBuzz } from './fizz-buzz';

describe('Fizz Buzz test', () => {
  describe('fizz', () => {
    it.each([{ input: 6 }, { input: 9 }, { input: 12 }])(
      '$input',
      ({ input }) => {
        //Arrange
        const expected = 'Fizz';
        const sut = createFizzBuzz();

        //Act
        const actual = sut.go(input);

        //Assert
        expect(actual).toBe(expected);
      }
    );
  });

  describe('buzz', () => {
    it.each([{ input: 5 }, { input: 10 }, { input: 20 }])(
      '$input',
      ({ input }) => {
        //Arrange
        const expected = 'Buzz';
        const sut = createFizzBuzz();

        //Act
        const actual = sut.go(input);

        //Assert
        expect(actual).toBe(expected);
      }
    );
  });

  describe('fizzbuzz', () => {
    it.each([{ input: 15 }, { input: 30 }, { input: 45 }])(
      '$input',
      ({ input }) => {
        //Arrange
        const expected = 'FizzBuzz';
        const sut = createFizzBuzz();

        //Act
        const actual = sut.go(input);

        //Assert
        expect(actual).toBe(expected);
      }
    );
  });

  describe('number itself', () => {
    it.each([{ input: 1, expected: '1' }])('$input', ({ input, expected }) => {
      //Arrange
      const sut = createFizzBuzz();

      //Act
      const actual = sut.go(input);

      //Assert
      expect(actual).toBe(expected);
    });
  });

  describe('fizzwhiz', () => {
    it.each([{ input: 3 }])('$input', ({ input }) => {
      //Arrange
      const expected = 'FizzWhiz';
      const sut = createFizzBuzz();

      //Act
      const actual = sut.go(input);

      //Assert
      expect(actual).toBe(expected);
    });
  });

  //Add test cases for prime numbers to include Whiz
  /*
    2 => Whiz
    3 => FizzWhiz
    4 => 4
    5 => BuzzWhiz
    6 => Fizz
    7 => Whiz
    8 => 8
    9 => Fizz
    10 -> Buzz
    11 => Whiz
    12 => Fizz
    13 => Whiz
    14 => 14
    15 => FizzBuzz
   */
});
