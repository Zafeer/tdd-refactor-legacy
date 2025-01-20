# String Calculator Kata

This README documents the approach and steps followed during the String Calculator Kata, focusing on test-driven development (TDD), **learning tests** and iterative refactoring.

---

## Approach Using a Class

### Initial Setup

1. **Start with an empty string:**
   - Write a test case that passes an empty string and expects the result to be `0`.
   - Fake the implementation to return `0`.

### Single Number Test

2. **Add a single number test:**
   - Example input: `'6'`
   - Refactor the code to handle a single number:
     ```javascript
     if (input.length === 0) return 0;
     return parseInt(input);
     ```

### Two Numbers Test

3. **Test with two numbers:**
   - Example:
     ```javascript
     input: '6,3',
     expected: 9,
     ```
   - Initially, this will fail as `parseInt` will only process the first number.
   - Update the main code to handle two numbers:
     ```javascript
     if (input.includes(',')) {
       const op1 = input.split(',')[0];
       const op2 = input.split(',')[1];
       return parseInt(op1) + parseInt(op2);
     }
     ```

### Three Numbers Test

4. **Introduce a learning test:**
   - Before refactoring the main code for three numbers, create a learning test:
     ```javascript
     test('learning test', () => {
       expect('1,2,3'.split(',')).toEqual(['1', '2', '3']);
       expect(['1', '2', '3'].map((x) => parseInt(x))).toEqual([1, 2, 3]);
       expect([1, 2, 3].reduce((acc, x) => acc + x, 0)).toBe(6);
     });
     ```

### Iterative Refactoring

5. **Handle multiple numbers using a loop:**

   - Write the implementation using a `for` loop:
     ```javascript
     if (input.includes(',')) {
       const numbers = input.split(',');
       let sum = 0;
       for (let num of numbers) {
         sum += parseInt(num);
       }
       return sum;
     }
     ```

6. **Refactor to use `map` and `reduce`:**
   - Simplify the implementation:
     ```javascript
     if (input.length === 0) return 0;
     return input
       .split(',')
       .map((s) => parseInt(s))
       .reduce((total, n) => total + n, 0);
     ```

---

## Final Refactor

### Extract Method

- To ensure flexibility and avoid changes across the codebase if the constructor name changes, extract the instantiation logic into a method.

  ```javascript
  class StringCalculator {
    calculate(input) {
      if (input.length === 0) return 0;
      return input
        .split(',')
        .map((s) => parseInt(s))
        .reduce((total, n) => total + n, 0);
    }
  }

  const calculator = new StringCalculator();
  ```

---

## Key Considerations

- **Start Simple:** Begin with basic test cases, such as an empty string and a single number.
- **Learning Tests:** Use learning tests to understand new methods or APIs before refactoring the main code.
- **Iterative Development:** Progress from handling one number to multiple numbers incrementally.
- **Refactor:** Continuously simplify and refine the implementation.
- **Extract Methods:** Minimize dependency on constructor names and centralize logic to reduce maintenance overhead.

---

This process emphasizes the importance of small, incremental changes and learning tests to build a robust solution while adhering to TDD principles.
