import { describe, it } from 'vitest';
import {
  Expense,
  ExpenseType,
  PlainTextReportFormatter,
  HtmlReportFormatter,
  ExpenseTypeDetails,
} from '../app/expense-report'; // Adjust the import path
import { expect } from 'vitest';

describe('Expense Report with Lunch Category', () => {
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

  it('should include Lunch expenses in the report', () => {
    const expenses = [
      new Expense(ExpenseType.LUNCH, 1500),
      new Expense(ExpenseType.LUNCH, 2500),
    ];

    const formatter = new PlainTextReportFormatter();
    let output = '';
    output += formatter.generateHeader();
    expenses.forEach((expense) => {
      output += formatter.generateTableRow(expense);
    });
    output += formatter.generateFooter(4000, 4000);

    expect(output).toContain('Lunch');
    expect(output).toContain('1500');
    expect(output).toContain('2500');
  });
});
