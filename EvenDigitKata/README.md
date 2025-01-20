# OddEven Digits TDD Kata

This README documents the steps followed during the OddEven Digits TDD Kata, focusing on **One-to-Many** and **Backout** Green Bar Patterns.

---

## One-to-Many Green Bar Pattern

### Green Bar Patterns

- Known ways to get to green.

### One-to-Many Pattern

- Start with a single item before moving to a collection.

---

## Steps to Perform TDD for Even Digits Test

### Problem Statement

- Return `true` if all the digits of a number are even.
- Return `false` if any of the digits of a number are odd.

#### Examples

| Input | Output |
| ----- | ------ |
| 123   | false  |
| 222   | true   |
| 2     | true   |
| 3     | false  |
| 2468  | true   |
| 3468  | false  |

---

### TDD Process

1. **Start with the first test case:**

   - Keep the test empty initially.

2. **Add a simple test case for 0:**

   - Use only a function, avoiding nested return functions.

3. **Implement the main function:**

   - Initially, return `true` to pass the first test.

4. **Update the test case:**

   - Use `forEach` and add more test cases.

5. **Add logic for single-digit numbers:**

   - Example:
     ```javascript
     if (num === 1) return false;
     else return true;
     ```
   - Add more cases for numbers like 2 and 9.

6. **Introduce logic for checking odd digits:**

   - Example:
     ```javascript
     return num % 2 === 0;
     ```

7. **Expand to two-digit numbers:**

   - Check both unit and tens places using division:
     ```javascript
     if (num >= 10) {
       if (num % 2 === 1) return false;
       num = Math.floor(num / 10);
     }
     return num % 2 === 0;
     ```

8. **Handle three or more digits:**

   - Change the `if` condition to a `while` loop:
     ```javascript
     while (num >= 10) {
       if (num % 2 === 1) return false;
       num = Math.floor(num / 10);
     }
     return num % 2 === 0;
     ```

9. **Alternative Approach:**
   - Convert the number to a string and iterate over each character.

---

## Green Bar Patterns

### Obvious Pattern

- If the obvious solution doesn’t work:
  - Fake it until it’s correctly implemented.
  - If it fails, undo and try another approach.
- Refactor later.
- Consider equivalence and boundary partitions.
- Maintain a comprehensive suite of tests.

### Backout Pattern

- When unable to get a green bar (e.g., failing tests, broken production code):
  - Comment out production code.
  - Identify the mark of a successful test.

#### Ways Forward After Backout

1. **Learning Test:**
   - Write an implementation directly in a test to validate feasibility.
2. **Use Fake It and Triangulation:**
   - Simplify the implementation to identify correct behavior.

### Learning Test Pattern

- Use when:
  - Struggling to identify a pattern.
  - Exploring new modules or APIs.
  - Recovering from a backout.

---

## Key Considerations

- **Refactor Later:** Focus on getting tests green first.
- **Boundary Conditions:** Identify equivalence and boundary partitions for thorough test coverage.
- **Test Suite:** Ensure a robust suite of tests to validate all edge cases.
