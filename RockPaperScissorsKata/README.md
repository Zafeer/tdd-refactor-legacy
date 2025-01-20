# TDD Kata: Rock, Paper, Scissors

This document outlines the steps and principles followed to implement the classic "Rock, Paper, Scissors" game using Test-Driven Development (TDD).

## Task

Create a backend function (in TypeScript) to determine the winner between two players based on their chosen moves.

---

## Test Cases

| Player Move | Opponent Move | Result       |
| ----------- | ------------- | ------------ |
| Paper       | Rock          | Player Wins  |
| Paper       | Scissors      | Player Loses |
| Paper       | Paper         | Tie          |
| Rock        | Scissors      | Player Wins  |
| Rock        | Paper         | Player Loses |
| Rock        | Rock          | Tie          |
| Scissors    | Paper         | Player Wins  |
| Scissors    | Rock          | Player Loses |
| Scissors    | Scissors      | Tie          |

---

## Principles of TDD

### 3 Laws of TDD

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write more of a unit test than is sufficient to fail (including compilation failures).
3. You are not allowed to write more production code than is sufficient to pass the one failing unit test.

### Red-Green-Reflect-Refactor Cycle

Follow the cycle:

1. Write a failing test (Red).
2. Write just enough code to make the test pass (Green).
3. Reflect on the design and refactor the code as necessary while keeping all tests green.

---

## Steps and Implementation

### Step 1: Initial Implementation

- Define a test file which fails
- Add a test suite which again fails
- Add an empty test which passes

```typescript
describe('', () => {
  it('', () => {});
});
```

### Step 2: Add correct test details and failing SUT

```typescript
describe('rock-paper-scissors', () => {
  test('given....', () => {
    const sut = createRockPaperScissors();
  });
});
```

### Step 3: Add SUT in main code and import in Test file

```typescript
export function createRockPaperScissors() {}
```

```typescript
import { createRockPaperScissors } from './rock-paper-scissors';
```

### Step 4: Add calling method in test file which is not existing in main code. Use first case of Paper and Rock

```typescript
import { createRockPaperScissors } from './rock-paper-scissors';

describe('rock-paper-scissors', () => {
  test('given....', () => {
    const sut = createRockPaperScissors();
    sut.play('Paper', 'Rock');
  });
});
```

### Step 5: Update main code to return empty string

```typescript
interface RockPaperScissors {
  play(plMove: string, opMove: string): string;
}

export const createRockPaperScissors = (): RockPaperScissors => {
  return {
    play(plMove: string, opMove: string) {
      // Step 1 - Default return value
      return '';
    },
  };
};
```

### Step 6: Add assert in test block for Player Wins

```typescript
describe('rock-paper-scissors', () => {
  test('given....', () => {
    //Arrange
    const sut = createRockPaperScissors();

    //Act
    const actual = sut.play('Paper', 'Rock');

    //Assert
    expect(actual).toBe('Player Wins');
  });
});
```

### Step 7: Update main code to return Player Wins by default

```typescript
interface RockPaperScissors {
  play(plMove: string, opMove: string): string;
}

export const createRockPaperScissors = (): RockPaperScissors => {
  return {
    play(plMove: string, opMove: string) {
      // Step 1 - Default return value
      return 'Player wins';
    },
  };
};
```

### Step 8: Add new test for Paper and Scissors

- This will fail the tests since we expect Player wins

```typescript
describe('rock-paper-scissors', () => {
  test('given....', () => {
    //Arrange
    const sut = createRockPaperScissors();

    //Act
    const actual = sut.play('Paper', 'Scissors');

    //Assert
    expect(actual).toBe('Player looses');
  });
});
```

### Step 10: Update main code to return Player Looses if player is Paper and opponent is Scissors.

```typescript
interface RockPaperScissors {
  play(plMove: string, opMove: string): string;
}

export const createRockPaperScissors = (): RockPaperScissors => {
  return {
    play(plMove: string, opMove: string) {
      // Step 1 - Default return value
      if (opMove == 'Scissors') return 'Player looses';
      return 'Player wins';
    },
  };
};
```

### Step 11: Refactor by introducing Enumerations

Replace string arguments with enums for better type safety:

```typescript
export enum Move {
  Paper,
  Rock,
  Scissors,
}

export enum Outcome {
  PlayerWins,
  PlayerLoses,
  Tie,
}
```

Update the function to use `Move` and `Outcome` enums.

---

### Step 3: Incremental Refactor with Nested Conditions

Introduce nested conditions for handling various scenarios:

```typescript
if (plMove === Move.Scissors) {
  if (opMove === Move.Paper) {
    return Outcome.PlayerWins;
  }
  return Outcome.PlayerLoses;
}

if (plMove === Move.Rock) {
  if (opMove === Move.Scissors) {
    return Outcome.PlayerWins;
  }
  return Outcome.PlayerLoses;
}

if (plMove === Move.Paper) {
  if (opMove === Move.Rock) {
    return Outcome.PlayerWins;
  }
  return Outcome.PlayerLoses;
}

return Outcome.Tie;
```

---

### Step 4: Refactor Using Data Structures

Replace the nested conditions with a lookup array:

```typescript
const scenarios = [
  { plMove: Move.Scissors, opMove: Move.Paper, outcome: Outcome.PlayerWins },
  { plMove: Move.Scissors, opMove: Move.Rock, outcome: Outcome.PlayerLoses },
  { plMove: Move.Rock, opMove: Move.Scissors, outcome: Outcome.PlayerWins },
  { plMove: Move.Rock, opMove: Move.Paper, outcome: Outcome.PlayerLoses },
  { plMove: Move.Paper, opMove: Move.Rock, outcome: Outcome.PlayerWins },
  { plMove: Move.Paper, opMove: Move.Scissors, outcome: Outcome.PlayerLoses },
];

const result = scenarios.find(
  (scenario) => scenario.plMove === plMove && scenario.opMove === opMove
);

return result ? result.outcome : Outcome.Tie;
```

---

### Step 5: Add Tests

Group related tests using `describe` blocks for better readability and organization.

```typescript
describe('RockPaperScissors', () => {
  it('should return PlayerWins for Rock vs Scissors', () => {
    expect(play(Move.Rock, Move.Scissors)).toBe(Outcome.PlayerWins);
  });

  it('should return Tie for Rock vs Rock', () => {
    expect(play(Move.Rock, Move.Rock)).toBe(Outcome.Tie);
  });

  // Add other tests
});
```

---

### Step 6: Extend Functionality

Add new moves like Spock and Lizard by extending the `Move` enum and scenarios array:

```typescript
export enum Move {
  Paper,
  Rock,
  Scissors,
  Spock,
  Lizard,
}

const scenarios = [
  { plMove: Move.Scissors, opMove: Move.Paper, outcome: Outcome.PlayerWins },
  { plMove: Move.Rock, opMove: Move.Lizard, outcome: Outcome.PlayerWins },
  // Add more scenarios
];
```

---

## Summary

1. Followed the TDD cycle to implement the game logic.
2. Gradually introduced enums and improved code readability.
3. Refactored to use a lookup structure for maintainability.
4. Added new features and tested comprehensively.
