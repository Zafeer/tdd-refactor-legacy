# Age Calculator Kata

The **Age Calculator Kata** focuses on calculating the age given a birth date and a target date. Additionally, this Kata emphasizes the importance of **naming things accurately and meaningfully** during development.

## Naming Things

- **Progression of Naming:**
  - Nonsense → Accurate → Precise/Specific → Meaningful.
  - Example:
    - `Cake` → `Sum` → `SumOfAllTransactionsInAnAccount` → `Balance`.

Naming should convey the intent of the code as clearly as possible.

## Steps for Implementation

### Step 1: Initial Setup

Create a simple test to verify the age calculation:

```typescript
it('given birthDate of 1979/02/15 and targetDate of 2000/03/21 should return 21', () => {
  // Arrange
  const sut = ageCalculator();
  const birthDate = new Date('1979/02/15');
  const currentDate = new Date('2000/03/21');
  const expected = 21;

  // Act
  const actual = sut(birthDate, currentDate);

  // Assert
  expect(actual).toBe(expected);
});
```

### Step 2: Create a Stub

Export a function from the main module with a constant return value:

```typescript
export const ageCalculator = () => {
  return function (birthDate: Date, currentDate: Date) {
    return 21;
  };
};
```

### Step 3: Refactor Test Names

Change the test name to make it more meaningful:

```typescript
it('given birthDate of 1979/02/15 and targetDate of 2000/03/21 should return 21', () => {
  // Test code remains the same
});
```

### Step 4: Add Year-Based Calculation

After triangulating multiple test cases:

```typescript
export const ageCalculator = () => {
  return function (birthDate: Date, currentDate: Date) {
    return currentDate.getFullYear() - birthDate.getFullYear();
  };
};
```

### Step 5: Handling Edge Cases

#### Birthday Not Yet Occurred This Year

If the target date is before the birthday in the same year:

```typescript
if (
  birthDate.getMonth() > targetDate.getMonth() ||
  (birthDate.getMonth() === targetDate.getMonth() &&
    birthDate.getDate() > targetDate.getDate())
) {
  return completedYears - 1;
}
```

#### Same Date but Different Years

Add tests for boundary conditions where the birthday and target date fall on the same date in different years.

### Step 6: Refactor for Readability

Extract logic into well-named functions:

```typescript
function hasHadBirthday(birthDate: Date, targetDate: Date): boolean {
  return (
    birthDate.getMonth() < targetDate.getMonth() ||
    (birthDate.getMonth() === targetDate.getMonth() &&
      birthDate.getDate() <= targetDate.getDate())
  );
}

export const ageCalculator = () => {
  return function (birthDate: Date, currentDate: Date) {
    const completedYears = currentDate.getFullYear() - birthDate.getFullYear();

    if (hasHadBirthday(birthDate, currentDate)) return completedYears;
    return completedYears - 1;
  };
};
```

### Step 7: Add Leap Year and Other Edge Cases

Account for leap years and other boundary conditions:

- Test for leap year edge cases.
- Add comprehensive tests for same month and day scenarios.

## Final Notes

- **Focus on Naming:** Use meaningful names for variables, functions, and tests to convey their purpose.
- **Refactor Incrementally:** Use tools like VS Code’s refactor functionality (`Ctrl+Shift+R`) to extract functions and `F2` to rename variables.
- **Test Boundary Conditions:** Thoroughly test boundary conditions for completeness.
