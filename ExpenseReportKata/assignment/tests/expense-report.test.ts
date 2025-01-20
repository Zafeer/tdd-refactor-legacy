import { beforeEach, describe, it, test, afterEach, expect, vi } from 'vitest';
import {
  Expense,
  ExpenseType,
  PlainTextReportFormatter,
  HtmlReportFormatter,
  ExpenseTypeDetails,
  getMealOverExpenseMarker,
  getExpenseName,
  getFormattedDate,
  generateExpenseReport,
  JSONReportFormatter,
} from '../app/expense-report'; // Adjust the import path

// TDD with new Lunch feature
describe('Expense Report with new Lunch Category', () => {
  it('should recognize the Lunch category', () => {
    expect(ExpenseTypeDetails[ExpenseType.LUNCH]).toBeDefined();
    expect(ExpenseTypeDetails[ExpenseType.LUNCH].name).toBe('Lunch');
    expect(ExpenseTypeDetails[ExpenseType.LUNCH].limit).toBe(2000);
  });

  it('should mark Lunch expenses over the limit correctly', () => {
    const lunchExpenseUnderLimit = new Expense(ExpenseType.LUNCH, 1500);
    const lunchExpenseOverLimit = new Expense(ExpenseType.LUNCH, 2500);

    const formatter = new PlainTextReportFormatter();

    const underLimitRow = formatter.generateTableRow(lunchExpenseUnderLimit);
    const overLimitRow = formatter.generateTableRow(lunchExpenseOverLimit);

    expect(underLimitRow).toContain(' ');
    expect(overLimitRow).toContain('X');
  });

  it('should include Lunch expenses in the PlainText report', () => {
    const expenses = [
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2500),
    ];

    const formatter = new PlainTextReportFormatter();
    let output = '';
    output += formatter.generateHeader();
    expenses.forEach((expense) => {
      const row = formatter.generateTableRow(expense);
      output += formatter.generateTableRow(expense);
    });
    output += formatter.generateFooter(4000, 4000);

    expect(output).toContain('Lunch');
    expect(output).toContain('1500');
    expect(output).toContain('2500');
  });

  it('should include Lunch expenses in the HTML report', () => {
    const expenses = [
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2500),
    ];

    const formatter = new HtmlReportFormatter();
    let output = '';
    output += formatter.generateHeader();
    expenses.forEach((expense) => {
      const row = formatter.generateTableRow(expense);
      expect(row).toContain(`<td>Lunch</td>`);
      expect(row).toContain(`<td>${expense.amount}</td>`);
      output += formatter.generateTableRow(expense);
    });
    output += formatter.generateFooter(4000, 4000);

    expect(output).toContain('Lunch');
    expect(output).toContain('1500');
    expect(output).toContain('2500');
  });
});

// TDD with new JSONReportFormatter feature
describe('Expense Report with new JSONReportFormatter', () => {
  let formatter: JSONReportFormatter;

  beforeEach(() => {
    formatter = new JSONReportFormatter();
  });

  it('should generate header correctly', () => {
    const header = formatter.generateHeader();
    expect(header).toBe(
      `{\n  "date": "${getFormattedDate()}",\n  "expenses": [\n`
    );
  });

  Object.values(ExpenseType).forEach((type) => {
    it(`should generate table row correctly for ${type}`, () => {
      const expense = new Expense(type, 1501);
      const row = formatter.generateTableRow(expense);
      const expectedRow = `{"type": "${ExpenseTypeDetails[type].name}", "amount": 1501, "overLimit": ${ExpenseTypeDetails[type].limit > expense.amount ? '" "' : '"X"'}}`;
      expect(row.trim()).toBe(expectedRow);
    });
  });

  it('should generate footer correctly', () => {
    const footer = formatter.generateFooter(10000, 6000);
    const expectedFooter = `\n  ],\n  "mealExpenses": 6000,\n  "totalExpenses": 10000\n}`;
    expect(footer).toBe(expectedFooter);
  });

  it('should format the entire report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 6000),
      new Expense(ExpenseType.BREAKFAST, 800),
    ];
    const expectedReport = `{
  "date": "${getFormattedDate()}",
  "expenses": [
    {"type": "Dinner", "amount": 6000, "overLimit": "X"},
    {"type": "Breakfast", "amount": 800, "overLimit": " "}
  ],
  "mealExpenses": 6800,
  "totalExpenses": 6800
}`;

    let report = formatter.generateHeader();
    report += formatter.generateTableRow(expenses[0]);
    // report += `,\n`;
    report += formatter.generateTableRow(expenses[1]);
    report += formatter.generateFooter(6800, 6800);

    expect(report).toBe(expectedReport);
  });
});

// All Tests

// Unit Tests
describe('Expense Class', () => {
  Object.values(ExpenseType).forEach((type) => {
    it(`should correctly initialize Expense object for ${type}`, () => {
      const expense = new Expense(type, 3000);
      expect(expense.type).toBe(type);
      expect(expense.amount).toBe(3000);
    });
  });
});

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

// Integration Tests
describe('HtmlReportFormatter', () => {
  let formatter: HtmlReportFormatter;

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

describe('PlainTextReportFormatter', () => {
  let formatter: PlainTextReportFormatter;

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

describe('JSONReportFormatter', () => {
  let formatter: JSONReportFormatter;

  beforeEach(() => {
    formatter = new JSONReportFormatter();
  });

  test('should generate header correctly', () => {
    const header = formatter.generateHeader();
    expect(header).toContain('{\n  "date": "');
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

// End-to-End Tests
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
      new Expense(ExpenseType.DINNER, 6000),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 3000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new PlainTextReportFormatter();

    const expectedOutput = `Expense Report: ${getFormattedDate()}
Dinner        6000    X
Breakfast     1000
Lunch         3000    X    
Car Rental    10000   
Meal Expenses:  10000
Total Expenses:   20000`;

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
      expect.stringContaining('Total Expenses: 20000')
    );

    // Normalize spaces by collapsing them and removing newlines
    const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
    const actualOutput = consoleSpy.mock.calls.join('');

    // Ensure the full report matches the expected output
    expect(normalize(actualOutput)).toContain(normalize(expectedOutput));
  });

  it('should print JSON report correctly', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5001),
      new Expense(ExpenseType.BREAKFAST, 1000),
      new Expense(ExpenseType.LUNCH, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 10000),
    ];
    const formatter = new JSONReportFormatter();
    const expectedOutput = `{
  "date": "${getFormattedDate()}",
  "expenses": [
    {"type": "Dinner", "amount": 5001, "overLimit": "X"},
    {"type": "Breakfast", "amount": 1000, "overLimit": " "},
    {"type": "Lunch", "amount": 2000, "overLimit": " "},
    {"type": "Car Rental", "amount": 10000, "overLimit": " "}
  ],
  "mealExpenses": 8001,
  "totalExpenses": 18001
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

  it('should handle all expense categories with over and normal limits for Plain Text report', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.DINNER, 5001),
      new Expense(ExpenseType.BREAKFAST, 500),
      new Expense(ExpenseType.BREAKFAST, 1001),
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2001),
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

  it('should handle all expense categories with over and normal limits for HTML report', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.DINNER, 5001),
      new Expense(ExpenseType.BREAKFAST, 500),
      new Expense(ExpenseType.BREAKFAST, 1001),
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2001),
      new Expense(ExpenseType.CAR_RENTAL, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 50000),
    ];
    const formatter = new HtmlReportFormatter();
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
<tr><td>Dinner</td><td>5000</td><td> </td></tr>
<tr><td>Dinner</td><td>5001</td><td>X</td></tr>
<tr><td>Breakfast</td><td>500</td><td> </td></tr>
<tr><td>Breakfast</td><td>1001</td><td>X</td></tr>
<tr><td>Lunch</td><td>1500</td><td> </td></tr>
<tr><td>Lunch</td><td>2001</td><td>X</td></tr>
<tr><td>Car Rental</td><td>2000</td><td> </td></tr>
<tr><td>Car Rental</td><td>50000</td><td> </td></tr>
</tbody>
</table>
<p>Meal Expenses: 15003</p>
<p>Total Expenses: 67003</p>
</body>
</html>`;

    generateExpenseReport(formatter, expenses);
    const actualOutput = consoleSpy.mock.calls[0][0];

    // Check if the actual output contains the expected output
    expect(actualOutput).toContain(expectedOutput);
  });

  it('should handle all expense categories with over and normal limits for JSON report', () => {
    const expenses = [
      new Expense(ExpenseType.DINNER, 5000),
      new Expense(ExpenseType.DINNER, 5001),
      new Expense(ExpenseType.BREAKFAST, 500),
      new Expense(ExpenseType.BREAKFAST, 1001),
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2001),
      new Expense(ExpenseType.CAR_RENTAL, 2000),
      new Expense(ExpenseType.CAR_RENTAL, 50000),
    ];
    const formatter = new JSONReportFormatter();
    const expectedOutput = `{
  "date": "${getFormattedDate()}",
  "expenses": [
    {"type": "Dinner", "amount": 5000, "overLimit": " "},
    {"type": "Dinner", "amount": 5001, "overLimit": "X"},
    {"type": "Breakfast", "amount": 500, "overLimit": " "},
    {"type": "Breakfast", "amount": 1001, "overLimit": "X"},
    {"type": "Lunch", "amount": 1500, "overLimit": " "},
    {"type": "Lunch", "amount": 2001, "overLimit": "X"},
    {"type": "Car Rental", "amount": 2000, "overLimit": " "},
    {"type": "Car Rental", "amount": 50000, "overLimit": " "}
  ],
  "mealExpenses": 15003,
  "totalExpenses": 67003
}`;

    generateExpenseReport(formatter, expenses);
    const actualOutput = consoleSpy.mock.calls[0][0];

    // Check if the actual output contains the expected output
    expect(actualOutput).toContain(expectedOutput);
  });
});
