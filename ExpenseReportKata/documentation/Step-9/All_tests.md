# Test Documentation for Expense Reporting System

This document outlines the tests implemented for the Expense Reporting System, covering Unit, Integration, and End-to-End Tests.

## Unit Tests

### Expense Class

Tests to ensure the `Expense` class initializes correctly for all types of expenses.

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
describe('generateExpenseReport', () => {
  let consoleSpy;

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

    generateExpenseReport(formatter, expenses);
    expect(consoleSpy.mock.calls[0][0]).toContain('<title>Expense Report');
  });

  it('should print Plain Text report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 500),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new PlainTextReportFormatter();

    generateExpenseReport(formatter, expenses);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Total Expenses: 13500')
    );
  });

  it('should print JSON report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new JSONReportFormatter();

    generateExpenseReport(formatter, expenses);
    expect(consoleSpy.mock.calls[0][0]).toContain('"totalExpenses": 18000');
  });
});
```
