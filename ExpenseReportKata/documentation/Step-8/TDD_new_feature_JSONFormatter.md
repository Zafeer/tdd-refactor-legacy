# TDD for Adding JSON Formatter Report to Expense Report

This document outlines the step-by-step process of implementing the **JSON Formatter Report** using Test-Driven Development (TDD). We follow the **Red-Green-Refactor** cycle.

---

## Step 1: Understand Requirements

The JSONReportFormatter should:

- Generate a JSON-formatted header with the report date.
- Create JSON rows for each expense with fields for type, amount, and over-limit status.
- Generate a JSON footer with total expenses and meal expenses.
- Produce a complete JSON report combining all these elements.

## Step 2: TDD for Header Generation

### Write a failing test

```typescript
import { JSONReportFormatter } from './expense-report';
import { getFormattedDate } from './expense-report';
describe('JSONReportFormatter', () => {
  let formatter: JSONReportFormatter;
  beforeEach(() => {
    formatter = new JSONReportFormatter();
  });
  it('should generate header correctly', () => {
    const header = formatter.generateHeader();
    const expectedHeader = `{    "date": "${getFormattedDate()}",    "expenses": [`;
    expect(header).toBe(expectedHeader);
  });
});
```

#### Write Code to Pass the Test

```typescript
class JSONReportFormatter {
  generateHeader(): string {
    return `{    "date": "${getFormattedDate()}",    "expenses": [`;
  }
}
```

## Step 3: Row Generation

#### Write a Failing Test for Rows

```typescript
import { Expense, ExpenseType, ExpenseTypeDetails } from './path-to-module';
describe('JSONReportFormatter', () => {
  it('should generate table row correctly', () => {
    const expense = new Expense(ExpenseType.DINNER, 1500);
    const row = formatter.generateTableRow(expense);
    const expectedRow = `    {"type": "${ExpenseTypeDetails[ExpenseType.DINNER].name}", "amount": 1500, "overLimit": " "}`;
    expect(row.trim()).toBe(expectedRow);
  });
});
```

#### Write Code to Pass the Test

```typescript
class JSONReportFormatter {
  generateTableRow(expense: Expense): string {
    const { name } = ExpenseTypeDetails[expense.type];
    const overLimit =
      expense.amount > ExpenseTypeDetails[expense.type].limit ? 'X' : ' ';
    return `    {"type": "${name}", "amount": ${expense.amount}, "overLimit": "${overLimit}"}`;
  }
}
```

### Step 4: Footer Generation

#### Write a Failing Test for Footer

```typescript
describe('JSONReportFormatter', () => {
  it('should generate footer correctly', () => {
    const footer = formatter.generateFooter(10000, 6000);
    const expectedFooter = `    ],    "mealExpenses": 6000,    "totalExpenses": 10000  }`;
    expect(footer).toBe(expectedFooter);
  });
});
```

#### Write Code to Pass the Test

```typescript
class JSONReportFormatter {
  generateFooter(totalExpenses: number, mealExpenses: number): string {
    return `    ],    "mealExpenses": ${mealExpenses},    "totalExpenses": ${totalExpenses}  }`;
  }
}
```

### Step 5: Full Report Generation

#### Write a Failing Test for Full Report

```typescript
describe('JSONReportFormatter', () => {
  // Existing setup
  it('should generate the full report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 6000),
      new Expense(ExpenseType.BREAKFAST, 800),
    ];
    let report = formatter.generateHeader();
    report += formatter.generateTableRow(expenses[0]);
    report += ',\n';
    report += formatter.generateTableRow(expenses[1]);
    report += formatter.generateFooter(6800, 6800);
    const expectedReport = `{    "date": "${getFormattedDate()}",    "expenses": [      {"type": "Dinner", "amount": 6000, "overLimit": "X"},      {"type": "Breakfast", "amount": 800, "overLimit": " "}    ],    "mealExpenses": 6800,    "totalExpenses": 6800  }`;
    expect(report).toBe(expectedReport);
  });
});
```

#### Write Code to Pass the Test

No new methods are needed; combine the existing methods.
