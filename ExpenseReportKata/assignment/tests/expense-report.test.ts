import { describe, it } from 'vitest';
import {
  Expense,
  ExpenseType,
  PlainTextReportFormatter,
  HtmlReportFormatter,
  ExpenseTypeDetails,
} from '../app/expense-report'; // Adjust the import path
import { expect } from 'vitest';

//TDD with new features - for all tests see below//
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
    let report = formatter.generateHeader();
    report += formatter.generateTableRow(expenses[0]);
    // report += `,\n`;
    report += formatter.generateTableRow(expenses[1]);
    report += formatter.generateFooter(6800, 6800);

    const expectedReport = `{
  "date": "${getFormattedDate()}",
  "expenses": [
    {"type": "Dinner", "amount": 6000, "overLimit": "X"},
    {"type": "Breakfast", "amount": 800, "overLimit": " "}
  ],
  "mealExpenses": 6800,
  "totalExpenses": 6800
}`;
    expect(report).toBe(expectedReport);
  });
});
