export enum Move {
  Rock,
  Paper,
  Scissors,
}

export enum Outcome {
  PlayerWins,
  PlayerLooses,
  Tie,
}

interface RockPaperScissors {
  play(plMove: Move, opMove: Move): Outcome;
}

export const createRockPaperScissors = (): RockPaperScissors => {
  // Function logic here
  return {
    play(plMove: Move, opMove: Move) {
      const scenarios = new Array(
        {
          plMove: Move.Scissors,
          opMove: Move.Paper,
          outcome: Outcome.PlayerWins,
        },
        {
          plMove: Move.Scissors,
          opMove: Move.Rock,
          outcome: Outcome.PlayerLooses,
        },
        {
          plMove: Move.Rock,
          opMove: Move.Scissors,
          outcome: Outcome.PlayerWins,
        },
        {
          plMove: Move.Rock,
          opMove: Move.Paper,
          outcome: Outcome.PlayerLooses,
        },
        { plMove: Move.Paper, opMove: Move.Rock, outcome: Outcome.PlayerWins },
        {
          plMove: Move.Paper,
          opMove: Move.Scissors,
          outcome: Outcome.PlayerLooses,
        }
      );
      // if (plMove === opMove) {
      //   return Outcome.Tie;
      // }

      // if (plMove === Move.Scissors) {
      //   if (opMove === Move.Paper) {
      //     return Outcome.PlayerWins;
      //   }
      //   return Outcome.PlayerLooses;
      // }

      const result = scenarios.find(
        (scenario) => scenario.plMove === plMove && scenario.opMove === opMove
      );
      // if (result) return result.outcome;
      // return Outcome.Tie;

      return result ? result.outcome : Outcome.Tie;

      // if (plMove === Move.Rock) {
      //   if (opMove === Move.Scissors) {
      //     return Outcome.PlayerWins;
      //   }
      //   return Outcome.PlayerLooses;
      // }

      // if (plMove === Move.Paper) {
      //   if (opMove === Move.Rock) {
      //     return Outcome.PlayerWins;
      //   }
      //   return Outcome.PlayerLooses;
      // }

      //Step 2 - Add a opMove with scissor condition
      // if (opMove === Move.Scissors) {
      //   if (plMove === Move.Rock) {
      //     return Outcome.PlayerWins;
      //   }
      //   return Outcome.PlayerLooses;
      // }
      // if (opMove === Move.Paper) {
      //   return Outcome.PlayerLooses;
      // }
      // //Step 1 - Default
      // return Outcome.PlayerWins;
    },
  };
};
