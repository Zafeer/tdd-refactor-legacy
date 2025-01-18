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
