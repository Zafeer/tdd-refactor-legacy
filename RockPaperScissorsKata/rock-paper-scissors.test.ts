import { describe, expect, it } from 'vitest';
import { createRockPaperScissors, Move, Outcome } from './rock-paper-scissors';

describe('rock-paper-scissors', () => {
  describe('play', () => {
    describe('paper vs rock', () => {
      it.each([
        {
          playerMove: Move.Paper,
          opponentMove: Move.Rock,
          expected: Outcome.PlayerWins,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Paper,
          expected: Outcome.PlayerLooses,
        },
      ])(
        'given player plays $playerMove and opponent plays $opponentMove player should $expected',
        ({ playerMove, opponentMove, expected }) => {
          //Arrange
          const sut = createRockPaperScissors();

          //Act
          const actual = sut.play(playerMove, opponentMove);

          //Assert
          expect(actual).toBe(expected);
        }
      );
    });
    // describe('paper vs rock', () => {
    //   it('given player plays paper and opponent plays rock player wins', () => {
    //     //Arrange
    //     const playerMove = Move.Paper;
    //     const opponentMove = Move.Rock;
    //     const expected = Outcome.PlayerWins;

    //     const sut = createRockPaperScissors();

    //     //Act
    //     const actual = sut.play(playerMove, opponentMove);

    //     //Assert
    //     expect(actual).toBe(expected);
    //   });

    //   it('given player plays rock and opponent plays paper player looses', () => {
    //     //Arrange
    //     const playerMove = Move.Rock;
    //     const opponentMove = Move.Paper;
    //     const expected = Outcome.PlayerLooses;

    //     const sut = createRockPaperScissors();

    //     //Act
    //     const actual = sut.play(playerMove, opponentMove);

    //     //Assert
    //     expect(actual).toBe(expected);
    //   });
    // });

    describe('paper vs scissors', () => {
      it('given player plays paper and opponent plays scissor player looses', () => {
        //Arrange
        const playerMove = Move.Paper;
        const opponentMove = Move.Scissors;
        const expected = Outcome.PlayerLooses;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });

      it('given player plays scissor and opponent plays paper player wins', () => {
        //Arrange
        const playerMove = Move.Scissors;
        const opponentMove = Move.Paper;
        const expected = Outcome.PlayerWins;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });
    });

    describe('rock vs scissors', () => {
      it('given player plays rock and opponent plays scissor player wins', () => {
        //Arrange
        const playerMove = Move.Rock;
        const opponentMove = Move.Scissors;
        const expected = Outcome.PlayerWins;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });

      it('given player plays scissor and opponent plays rock player looses', () => {
        //Arrange
        const playerMove = Move.Scissors;
        const opponentMove = Move.Rock;
        const expected = Outcome.PlayerLooses;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });
    });

    describe('tie', () => {
      it('given player plays scissors and opponent plays scissor should result in tie', () => {
        //Arrange
        const playerMove = Move.Scissors;
        const opponentMove = Move.Scissors;
        const expected = Outcome.Tie;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });

      it('given player plays rock and opponent plays rock should result in tie', () => {
        //Arrange
        const playerMove = Move.Rock;
        const opponentMove = Move.Rock;
        const expected = Outcome.Tie;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });

      it('given player plays paper and opponent plays paper should result in tie', () => {
        //Arrange
        const playerMove = Move.Paper;
        const opponentMove = Move.Paper;
        const expected = Outcome.Tie;

        const sut = createRockPaperScissors();

        //Act
        const actual = sut.play(playerMove, opponentMove);

        //Assert
        expect(actual).toBe(expected);
      });
    });
  });
});
