# Refactoring Legacy Code and Implementing TDD for New Code/Features

This repository is a collection of **Test-Driven Development (TDD) Katas** and **Legacy Refactoring Katas**, designed to write clean, maintainable, and testable code.

## Objectives

- **Refactor Legacy Code:** Improve the structure and quality of existing codebases without changing their external behavior.

- **Promote TDD Practices:** Encourage the habit of writing tests before implementing functionality.
  1.  Use FIRST Principles
  2.  Use Red-Green-Refactor
  3.  Boundary Testing
  4.  Fake It (Till You Make It)
  5.  Learning Tests
  6.  One to many
  7.  Triangulation
  8.  Backout
  9.  Test Doubles

## Contents

### 1. Legacy Refactoring Kata

This excercise focusses on improving poorly written code while preserving functionality. Examples include:

- [**Expense Report Generator Kata**](ExpenseReportKata)

### 2. TDD Katas

These exercises are aimed at practicing TDD principles by building solutions incrementally with tests. Examples include:

- [**FizzBuzz Kata**](FizzBuzzKata)
- [**RockPaperScissors Kata**](RockPaperScissorsKata)
- [**AgeCalculator Kata**](AgeCalculatorKata)
- [**EvenDigit Kata**](EvenDigitKata)
- [**String Calculator Kata**](StringCalculatorKata)

## How to Use

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Zafeer/tdd-refactor-legacy.git
   cd tdd-refactor-legacy
   ```

2. **Set Up the Environment:**
   Install the necessary dependencies for Typescript (i.e. NodeJS if not already installed).
   Preconfigured with linting and formatting

   ```bash
   npm i
   ```

3. **Pick an Exercise:**
   Navigate to the desired kata directory and follow the README for specific instructions.

4. **Write Tests:**
   Start by writing approval tests(if legacy), failing tests, implement functionality, and refactor iteratively.

5. **Run Tests:**
   Use vitest to verify your solution:
   ```bash
   npm run test:watch  # JavaScript/TypeScript
   ```

---
