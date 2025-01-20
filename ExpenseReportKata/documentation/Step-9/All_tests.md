# Test Documentation for Expense Reporting System

This document outlines the tests implemented for the Expense Reporting System, covering Unit, Integration, and End-to-End Tests.

## Unit Tests

### Expense Class

Tests to ensure the `Expense` class initializes correctly for all types of expenses.

```typescript
describe('Expense Class', () => {
  Object.values(ExpenseType).forEach((type) => {
    it(`should correctly initialize Expense object for ${type}`, () => {
      const expense = new Expense(type, 3000);
      expect(expense.type).toBe(type);
      expect(expense.amount).toBe(3000);
    });
  });
});
```

### Utility Functions

Tests for utility functions that handle various expense operations.

```typescript
describe('Utility Functions', () => {
  Object.values(ExpenseType).forEach((type) => {
    if (type === ExpenseType.CAR_RENTAL) {
      it(`getMealOverExpenseMarker should return " " for ${type} as it has no limit`, () => {
        const expense = new Expense(type, 1000000);
        expect(getMealOverExpenseMarker(expense)).toBe(' ');
      });
    } else {
      it(`getMealOverExpenseMarker should return "X" if ${type} amount exceeds limit`, () => {
        const expense = new Expense(type, ExpenseTypeDetails[type].limit + 1);
        expect(getMealOverExpenseMarker(expense)).toBe('X');
      });
    }

    it(`getMealOverExpenseMarker should return " " if ${type} amount does not exceed limit`, () => {
      const expense = new Expense(type, ExpenseTypeDetails[type].limit - 1);
      expect(getMealOverExpenseMarker(expense)).toBe(' ');
    });

    it(`getExpenseName should return the correct name for ${type}`, () => {
      expect(getExpenseName(new Expense(type, 3000))).toBe(
        ExpenseTypeDetails[type].name
      );
    });
  });

  it('getFormattedDate should return current date in YYYY-MM-DD format', () => {
    const date = new Date().toISOString().substr(0, 10);
    expect(getFormattedDate()).toBe(date);
  });
});
```

## Integration Tests

### HtmlReportFormatter

Tests for the `HtmlReportFormatter` class, ensuring proper generation of headers, rows, and footers.

```typescript
describe('HtmlReportFormatter', () => {
  let formatter;

  beforeEach(() => {
    formatter = new HtmlReportFormatter();
  });

  it('should generate header correctly', () => {
    const header = formatter.generateHeader();
    expect(header).toContain('<title>Expense Report');
    expect(header).toContain('<h1>Expense Report:');
  });

  Object.values(ExpenseType).forEach((type) => {
    it(`should generate table row correctly for ${type}`, () => {
      const expense = new Expense(type, 1500);
      const row = formatter.generateTableRow(expense);
      expect(row).toContain(`<td>${ExpenseTypeDetails[type].name}</td>`);
      expect(row).toContain('<td>1500</td>');
    });
  });

  it('should generate footer correctly', () => {
    const footer = formatter.generateFooter(10000, 6000);
    expect(footer).toContain('<p>Meal Expenses: 6000</p>');
    expect(footer).toContain('<p>Total Expenses: 10000</p>');
  });
});
```

### PlainTextReportFormatter

Tests for the `PlainTextReportFormatter` class, ensuring proper text-based report generation.

```typescript
describe('PlainTextReportFormatter', () => {
  let formatter;

  beforeEach(() => {
    formatter = new PlainTextReportFormatter();
  });

  it('should generate header correctly', () => {
    const header = formatter.generateHeader();
    expect(header).toContain('Expense Report:');
  });

  Object.values(ExpenseType).forEach((type) => {
    it(`should generate table row correctly for ${type}`, () => {
      const expense = new Expense(type, 2500);
      const row = formatter.generateTableRow(expense);
      expect(row).toContain(ExpenseTypeDetails[type].name);
      expect(row).toContain('2500');
    });
  });

  it('should generate footer correctly', () => {
    const footer = formatter.generateFooter(8000, 5000);
    expect(footer).toContain('Meal Expenses: 5000');
    expect(footer).toContain('Total Expenses: 8000');
  });
});
```

### JSONReportFormatter

Tests for the `JSONReportFormatter` class, ensuring proper JSON report generation.

```typescript
describe('JSONReportFormatter', () => {
  let formatter;

  beforeEach(() => {
    formatter = new JSONReportFormatter();
  });

  test('should generate header correctly', () => {
    const header = formatter.generateHeader();
    expect(header).toContain('{
  "date": "');
    expect(header).toContain('"expenses": [');
  });

  Object.values(ExpenseType).forEach((type) => {
    test(`should generate table row correctly for ${type}`, () => {
      const expense = new Expense(type, 2500);
      const row = formatter.generateTableRow(expense);
      expect(row).toContain(`"type": "${ExpenseTypeDetails[type].name}"`);
      expect(row).toContain('"amount": 2500');
    });
  });

  test('should generate footer correctly', () => {
    const footer = formatter.generateFooter(8000, 5000);
    expect(footer).toContain('"mealExpenses": 5000');
    expect(footer).toContain('"totalExpenses": 8000');
  });
});
```

## End-to-End Tests

### generateExpenseReport Function

Comprehensive tests for the `generateExpenseReport` function, covering different report formats and scenarios.

```typescript
describe('generateExpenseReport', () => {
  let consoleSpy: any;

  beforeEach(() => {
    consoleSpy = vi
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should print HTML report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 6000),
      new Expense(ExpenseType.BREAKFAST, 800),
      new Expense(ExpenseType.LUNCH, 3000),
      new Expense(ExpenseType.CAR_RENTAL, 15000),
    ];
    const formatter = new HtmlReportFormatter();
    // Corrected expected output with proper placement of 'X' markers and closing tags
    const expectedOutput = `<!DOCTYPE html>
<html>
<head>
<title>Expense Report: ${getFormattedDate()}</title>
</head>
<body>
<h1>Expense Report: ${getFormattedDate()}</h1>
<table>
<thead>
<tr><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Over Limit</th></tr>
</thead>
<tbody>
<tr><td>Dinner</td><td>6000</td><td>X</td></tr>
<tr><td>Breakfast</td><td>800</td><td> </td></tr>
<tr><td>Lunch</td><td>3000</td><td>X</td></tr>
<tr><td>Car Rental</td><td>15000</td><td> </td></tr>
</tbody>
</table>
<p>Meal Expenses: 9800</p>
<p>Total Expenses: 24800</p>
</body>
</html>`;

    generateExpenseReport(formatter, expenses);
    const actualOutput = consoleSpy.mock.calls[0][0];

    // Check if the actual output contains the expected output
    expect(actualOutput).toContain(expectedOutput);
  });

  it('should print Plain Text report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 500),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 3000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new PlainTextReportFormatter();

    const expectedOutput = `Expense Report: ${getFormattedDate()}
Dinner        500
Breakfast     1000
Lunch         2000      
Car Rental    10000   
Meal Expenses:  3500
Total Expenses:   13500`;

    // Execute the function to print the report
    generateExpenseReport(formatter, expenses);

    // Ensure each type is mentioned in the output
    Object.values(ExpenseType).forEach((type) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(ExpenseTypeDetails[type].name)
      );
    });

    // Ensure total expenses are correctly printed
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Total Expenses: 13500')
    );

    // Normalize spaces by collapsing them and removing newlines
    const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
    const actualOutput = consoleSpy.mock.calls.join('');

    // Ensure the full report matches the expected output
    expect(normalize(actualOutput)).toContain(normalize(expectedOutput));
  });

  it('should print JSON report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new JSONReportFormatter();
    const expectedOutput = `{
  "date": "${getFormattedDate()}",
  "expenses": [
    {"type": "Dinner", "amount": 5000, "overLimit": " "},
    {"type": "Breakfast", "amount": 1000, "overLimit": " "},
    {"type": "Lunch", "amount": 2000, "overLimit": " "},
    {"type": "Car Rental", "amount": 10000, "overLimit": " "}
  ],
  "mealExpenses": 8000,
  "totalExpenses": 18000
}`;

    generateExpenseReport(formatter, expenses);
    const actualOutput = consoleSpy.mock.calls[0][0]; // The first call and the first argument passed

    expect(actualOutput).toContain(expectedOutput);
  });

  it('should handle empty expense list gracefully', () => {
    const expenses: Expense[] = [];
    const formatter = new HtmlReportFormatter();

    generateExpenseReport(formatter, expenses);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('<p>Total Expenses: 0</p>')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('<p>Meal Expenses: 0</p>')
    );
  });

  it('should handle all expense categories with over and normal limits', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.DINNER, 6000),
      new Expense(ExpenseType.BREAKFAST, 500),
      new Expense(ExpenseType.BREAKFAST, 2000),
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 3000),
      new Expense(ExpenseType.CAR_RENTAL, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 50000),
    ];
    const formatter = new PlainTextReportFormatter();

    generateExpenseReport(formatter, expenses);

    expenses.forEach((expense) => {
      const overLimitMarker =
        expense.amount > ExpenseTypeDetails[expense.type].limit ? '\tX' : '';
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ExpenseTypeDetails[expense.type].name}\t${expense.amount}${overLimitMarker}`
        )
      );
    });
  });
});
```
