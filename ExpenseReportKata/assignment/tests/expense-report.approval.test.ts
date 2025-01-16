import { describe, expect, it, vi } from 'vitest';
import {
  printReport,
  Expense,
  PlainTextReportFormatter,
  HtmlReportFormatter,
  ExpenseType,
} from '../app/expense-report';

function captureAndNormalizeStdout(callback: () => void): string {
  const mockStdoutWrite = vi
    .spyOn(process.stdout, 'write')
    .mockImplementation(() => true);

  callback();

  const output = mockStdoutWrite.mock.calls.join('');
  mockStdoutWrite.mockRestore();

  return output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize dates
}

describe('Expense Report - Approval Tests', () => {
  describe('should generate a plain text report', () => {
    it('with no expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [];

      //Act
      const output = captureAndNormalizeStdout(() => {
        const reportFormatter = new PlainTextReportFormatter();
        printReport(reportFormatter, expenses);
      });

      // Assert
      expect(output).toMatchSnapshot();

      //Clean up
      mockStdoutWrite.mockRestore();
    });

    it('with under and over limit expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [
        new Expense(ExpenseType.DINNER, 3000),
        new Expense(ExpenseType.BREAKFAST, 500),
        new Expense(ExpenseType.CAR_RENTAL, 10000),
        new Expense(ExpenseType.DINNER, 5001), // Over-limit dinner
        new Expense(ExpenseType.BREAKFAST, 1001), // Over-limit breakfast
        new Expense(ExpenseType.CAR_RENTAL, Number.MAX_SAFE_INTEGER), // Max car-rental
      ];

      //Act
      const output = captureAndNormalizeStdout(() => {
        const reportFormatter = new PlainTextReportFormatter();
        printReport(reportFormatter, expenses);
      });

      //Assert
      expect(output).toMatchSnapshot();

      //Clean up
      mockStdoutWrite.mockRestore();
    });
  });

  describe('should generate a html report', () => {
    it('with no expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [];

      //Act
      const output = captureAndNormalizeStdout(() => {
        const reportFormatter = new HtmlReportFormatter();
        printReport(reportFormatter, expenses);
      });

      // Assert
      expect(output).toMatchSnapshot();

      //Clean up
      mockStdoutWrite.mockRestore();
    });
    it('with under and over limit expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [
        new Expense(ExpenseType.DINNER, 3000),
        new Expense(ExpenseType.BREAKFAST, 500),
        new Expense(ExpenseType.CAR_RENTAL, 10000),
        new Expense(ExpenseType.DINNER, 5001), // Over-limit dinner
        new Expense(ExpenseType.BREAKFAST, 1001), // Over-limit breakfast
        new Expense(ExpenseType.CAR_RENTAL, Number.MAX_SAFE_INTEGER), // Max car-rental
      ];

      //Act
      const output = captureAndNormalizeStdout(() => {
        const reportFormatter = new HtmlReportFormatter();
        printReport(reportFormatter, expenses);
      });

      //Assert
      expect(output).toMatchSnapshot();

      //Clean up
      mockStdoutWrite.mockRestore();
    });
  });
});
