# FizzBuzz TDD Kata

## Objective

The goal of this Kata is to implement the FizzBuzz problem using Test-Driven Development (TDD). The problem consists of creating a function that returns:

- `Fizz` if the number is divisible by 3.
- `Buzz` if the number is divisible by 5.
- `FizzBuzz` if the number is divisible by both 3 and 5.
- The number itself otherwise.

Additionally, the implementation includes extensions for handling primes and other patterns.

---

## Steps to Solve

### 1. **Initial Setup**

- Create a function `createFizzBuzz` with a method `go`.
- The `go` method will process the input number and return the appropriate result.

```typescript
export const createFizzBuzz = () => {
  return {
    go: (input: number): string => {
      return ''; // Start with an empty return
    },
  };
};
```

### 2. **TDD Basics**

Follow the TDD cycle:

- **Red**: Write a failing test.
- **Green**: Make the test pass with the simplest solution.
- **Refactor**: Clean up the code without changing functionality.

```typescript
describe('FizzBuzz', () => {
  it("returns 'Fizz' for input divisible by 3", () => {
    // Arrange
    const sut = createFizzBuzz();
    const input = 3;

    // Act
    const result = sut.go(input);

    // Assert
    expect(result).toBe('Fizz');
  });
});
```

---

## Equivalence and Boundary Partitions

### Equivalence Partitioning

Group inputs based on expected behavior:

- **Other**: Numbers not divisible by 3 or 5 (e.g., 1, 2, 4).
- **Fizz**: Numbers divisible by 3 (e.g., 3, 6, 9).
- **Buzz**: Numbers divisible by 5 (e.g., 5, 10, 20).
- **FizzBuzz**: Numbers divisible by both 3 and 5 (e.g., 15, 30).

### Boundary Testing

Test values at the edge of equivalence partitions. For example, for input values 0, 1, and 15.

---

## Implementation Steps

### Step 1: Return Default Value

- Add the `go` method and return an empty string (`""`).
- Write a test to check if the method exists and executes without error.

### Step 2: Fake It Till You Make It

- Hardcode the return value to pass specific tests.

```typescript
if (input === 3) return 'Fizz';
if (input === 5) return 'Buzz';
```

### Step 3: Triangulation

Write additional tests for values in the same equivalence partition:

```typescript
it.each([
  { input: 3, expected: 'Fizz' },
  { input: 6, expected: 'Fizz' },
  { input: 9, expected: 'Fizz' },
])('returns $expected for input $input', ({ input, expected }) => {
  const sut = createFizzBuzz();
  expect(sut.go(input)).toBe(expected);
});
```

Refactor to:

```typescript
if (input % 3 === 0) return 'Fizz';
```

### Step 4: Handle Buzz

Repeat the process for `Buzz`:

```typescript
if (input % 5 === 0) return 'Buzz';
```

### Step 5: Handle FizzBuzz

Write tests for `FizzBuzz` and add:

```typescript
if (input % 15 === 0) return 'FizzBuzz';
```

### Step 6: Handle Default Case

Return the input number as a string:

```typescript
return input.toString();
```

---

## Extension: Prime Numbers (Whiz)

### Step 1: Add Prime Check

Introduce a condition for prime numbers. Prime numbers will return `Whiz`.

```typescript
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let factor = 2; factor <= Math.sqrt(num); factor++) {
    if (num % factor === 0) return false;
  }
  return true;
}

if (isPrime(input)) return 'Whiz';
```

### Step 2: Combine Conditions

Combine prime checks with existing conditions:

- `FizzWhiz`: Numbers divisible by 3 and prime.
- `BuzzWhiz`: Numbers divisible by 5 and prime.

Refactor to:

```typescript
if (isPrime(input)) {
  let result = 'Whiz';
  if (input % 3 === 0) result = 'Fizz' + result;
  if (input % 5 === 0) result = 'Buzz' + result;
  return result;
}
```

---

## Final Refactor

Replace conditionals with a more maintainable structure, such as a map or lookup table.

### Example:

```typescript
const rules = [
  { condition: (n: number) => n % 15 === 0, result: 'FizzBuzz' },
  { condition: (n: number) => n % 3 === 0, result: 'Fizz' },
  { condition: (n: number) => n % 5 === 0, result: 'Buzz' },
  { condition: (n: number) => isPrime(n), result: 'Whiz' },
];

for (const rule of rules) {
  if (rule.condition(input)) return rule.result;
}
return input.toString();
```

---

## Testing Patterns

### Green Bar Pattern

- Ensure all tests pass before adding new ones.
- Refactor code only when all tests are green.

### Triangulation

- Write tests for three values in each equivalence partition.
- Refactor once patterns emerge.

---

## Conclusion

By following TDD, we ensure:

1. The code works as expected.
2. Each feature is implemented incrementally.
3. Refactoring is safe due to the presence of comprehensive tests.
