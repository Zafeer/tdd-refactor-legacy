import { describe, expect, it, test } from 'vitest';
import { ageCalculator } from './age-calculator';

describe('age-calculator', () => {
  describe('given birthday already having taken place in the year', () => {
    test.each([
      {
        birthDate: new Date('1979/02/15'),
        targetDate: new Date('2000/03/21'),
        expected: 21,
      },
      {
        birthDate: new Date('1950/01/31'),
        targetDate: new Date('2001/03/21'),
        expected: 51,
      },
      {
        birthDate: new Date('2015/03/10'),
        targetDate: new Date('2022/03/21'),
        expected: 7,
      },
      {
        birthDate: new Date('2000/02/29'),
        targetDate: new Date('2008/02/29'),
        expected: 8,
      },
    ])(
      'birthdate : $birthDate, targetDate: $targetDate, expected: $expected',
      ({ birthDate, targetDate, expected }) => {
        //Arrange
        const sut = ageCalculator();

        //Act
        const actual = sut(birthDate, targetDate);

        //Assert
        expect(actual).toBe(expected);
      }
    );
  });

  describe('has not had birthday this year', () => {
    describe('birthDate in later month', () => {
      test.each([
        {
          birthDate: new Date('1979/02/15'),
          targetDate: new Date('2000/01/01'),
          expected: 20,
        },
        {
          birthDate: new Date('2015/03/21'),
          targetDate: new Date('2022/02/28'),
          expected: 6,
        },
        {
          birthDate: new Date('2004/02/29'),
          targetDate: new Date('2005/03/01'),
          expected: 1,
        },
      ])(
        'birthdate : $birthDate, targetDate: $targetDate, expected: $expected',
        ({ birthDate, targetDate, expected }) => {
          //Arrange
          const sut = ageCalculator();

          //Act
          const actual = sut(birthDate, targetDate);

          //Assert
          expect(actual).toBe(expected);
        }
      );
    });

    describe('birthDate in same month', () => {
      test.each([
        {
          birthDate: new Date('1950/01/31'),
          targetDate: new Date('2000/01/01'),
          expected: 49,
        },
        {
          birthDate: new Date('2000/02/29'),
          targetDate: new Date('2022/02/28'),
          expected: 21,
        },
      ])(
        'birthdate : $birthDate, targetDate: $targetDate, expected: $expected',
        ({ birthDate, targetDate, expected }) => {
          //Arrange
          const sut = ageCalculator();

          //Act
          const actual = sut(birthDate, targetDate);

          //Assert
          expect(actual).toBe(expected);
        }
      );
    });
  });
});
