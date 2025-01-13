import { greeter } from './greeter';

import { describe, expect, it } from 'vitest';

//Name for group of tests
describe('greeter', () => {
  //test or it both do the same thing - name and function
  it("helloWorld given default should return 'Hello, World!'", () => {
    //Arrange (Thing being tested)
    //State, Services or SUT
    const sut = greeter();
    const expected = 'Hello, World!';

    //Act (o/p of a thing being tested)
    const actual = sut.helloWorld();

    //Assert
    expect(actual).toBe(expected);

    //teardown
  });

  describe('helloPerson', () => {
    it("given empty name should return 'Hello !'", () => {
      //Arrange
      //State, Services or SUT
      const expected = 'Hello !';
      const input = '';

      const sut = greeter();

      //Act
      const actual = sut.helloPerson(input);

      //Assert
      expect(actual).toBe(expected);

      //teardown
    });

    it("given name of Peter should return 'Hello Peter!'", () => {
      //Arrange
      //State, Services or SUT
      const expected = 'Hello Peter!';
      const input = 'Peter';

      const sut = greeter();

      //Act
      const actual = sut.helloPerson(input);

      //Assert
      expect(actual).toBe(expected);

      //teardown
    });
  });
});
