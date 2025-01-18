# TDD for Adding Lunch Category to Expense Report

This document outlines the step-by-step process of implementing the **Lunch** category with a limit of **2000** using Test-Driven Development (TDD). We follow the **Red-Green-Refactor** cycle.

---

## Step 1: Understand Requirements

The Expense Report should:

- Accomodate a Lunch Expense
- Limit of 2000 for for each Lunch Expense.
- Over this limit ensures it is marked as overLimit expense

## Step 2: TDD for Recognizing Lunch Category

### Failing Test

Write a test to check that the `ExpenseType` enum recognizes the new **Lunch** category.

```typescript
import { describe, it } from 'node:test';
import { ExpenseType, ExpenseTypeDetails } from '../app/expense-report'; // Adjust the import path
import { expect } from 'vitest';

describe('Expense Report with Lunch Category', () => {
  it('should recognize the Lunch category', () => {
    expect(ExpenseType.LUNCH).toBeDefined();
  });
});
```

Run the test and observe the failure since Lunch is not yet defined in the application code.

## Step 3: Add Lunch Category to ExpenseType

### **Green**

Update the ExpenseType and in your code to include the Lunch category.

```typescript
const ExpenseType = {
  DINNER: 'dinner',
  BREAKFAST: 'breakfast',
  CAR_RENTAL: 'car-rental',
  LUNCH: 'lunch', // Add Lunch
} as const;
```

Rerun the test, and it should pass.

## Step 4: Add a Test for Recognizing Lunch Expense Details

### **Red**

Write a test to check that the `ExpenseTypeDetails` object recognizes the new **Lunch** category.

```typescript
import { describe, it } from 'node:test';
import { ExpenseType, ExpenseTypeDetails } from '../app/expense-report'; // Adjust the import path
import { expect } from 'vitest';

describe('Expense Report with Lunch Category', () => {
  it('should recognize the Lunch category', () => {
    expect(ExpenseTypeDetails[ExpenseType.LUNCH]).toBeDefined();
  });
});
```

Run the test and observe the failure since Lunch Details is not yet defined in the application code.

## Step 5: Add Lunch Expense Details to ExpenseTypeDetails

### **Green**

Update the ExpenseType and ExpenseTypeDetails objects in your code to include the Lunch category.

```typescript
const ExpenseType = {
  DINNER: 'dinner',
  BREAKFAST: 'breakfast',
  CAR_RENTAL: 'car-rental',
  LUNCH: 'lunch',
} as const;

const ExpenseTypeDetails: Record<ExpenseType, ExpenseDetails> = {
  [ExpenseType.DINNER]: { name: 'Dinner', limit: 5000, mealCategory: true },
  [ExpenseType.BREAKFAST]: {
    name: 'Breakfast',
    limit: 1000,
    mealCategory: true,
  },
  [ExpenseType.CAR_RENTAL]: {
    name: 'Car Rental',
    limit: Infinity,
    mealCategory: false,
  },
  [ExpenseType.LUNCH]: { name: 'Lunch', limit: 2000, mealCategory: true }, // Define Lunch
};
```

Rerun the test, and it should pass.

## Step 6: Check for all Lunch Expense Details to be defined

### **Green**

```typescript
Update the test to confirm all ExpenseTypeDetails for Lunch are defined
describe('Expense Report with Lunch Category', () => {
  it('should recognize the Lunch category', () => {
    expect(ExpenseTypeDetails[ExpenseType.LUNCH]).toBeDefined();
    expect(ExpenseTypeDetails[ExpenseType.LUNCH].name).toBe('Lunch');
    expect(ExpenseTypeDetails[ExpenseType.LUNCH].limit).toBe(2000);
  });
});
```

### Step 7: Implement Over-Limit Logic for Lunch

### **Green**

Write a test to ensure Lunch expenses exceeding the limit are marked as over-limit.

```typescript
it('should mark Lunch expenses over the limit correctly', () => {
  const lunchExpenseUnderLimit = new Expense(ExpenseType.LUNCH, 1500);
  const lunchExpenseOverLimit = new Expense(ExpenseType.LUNCH, 2500);

  const formatter = new PlainTextReportFormatter();

  const underLimitRow = formatter.generateTableRow(lunchExpenseUnderLimit);
  const overLimitRow = formatter.generateTableRow(lunchExpenseOverLimit);

  expect(underLimitRow).toContain(' '); // Not over-limit
  expect(overLimitRow).toContain('X'); // Over-limit
});
```

Run the test, and it will fail because the logic for marking over-limit Lunch expenses is not yet implemented.

### Step 8: Test Total and Meal Expenses with Lunch

### **Green**

Write a test to check that Lunch expenses are included in the total and meal expense calculations.

```typescript
it('should include Lunch expenses in the report', () => {
  const expenses = [
    new Expense(ExpenseType.LUNCH, 1500),
    new Expense(ExpenseType.LUNCH, 2500), // Over-limit
  ];

  const formatter = new PlainTextReportFormatter();
  let output = '';
  output += formatter.generateHeader();
  expenses.forEach((expense) => {
    output += formatter.generateTableRow(expense);
  });
  output += formatter.generateFooter(4000, 4000); // Meal expenses = total expenses in this case

  expect(output).toContain('Lunch');
  expect(output).toContain('4000'); // Total and meal expenses
});
```

Run the test, and it will fail if the totals are not calculated correctly for Lunch expenses.

### Step 9: Refactor

Review the implementation for opportunities to simplify or improve the structure. For instance:
Abstract repetitive operations in the formatter.

```typescript
// Refactor of expenseName by creating a new function
function getExpenseName(expense: Expense): string {
  return ExpenseTypeDetails[expense.type].name;
}
```

Use this helper method in the generateTableRow method of both formatters.
