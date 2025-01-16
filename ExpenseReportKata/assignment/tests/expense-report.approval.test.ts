import { describe, expect, it, vi } from 'vitest';
import { printReport, Expense } from '../app/expense-report';

describe('Expense Report - Approval Tests', () => {
  describe('should generate a plain text report', () => {
    it('with no expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [];

      //Act
      printReport(false, expenses);
      const output = mockStdoutWrite.mock.calls.join('');
      const normalizedOutput = output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize the date (e.g., YYYY-MM-DD)

      // Assert
      expect(normalizedOutput).toMatchSnapshot();

      mockStdoutWrite.mockRestore();
    });

    it('with under and over limit expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [
        new Expense('dinner', 3000),
        new Expense('breakfast', 500),
        new Expense('car-rental', 10000),
        new Expense('dinner', 5001), // Over-limit dinner
        new Expense('breakfast', 1001), // Over-limit breakfast
        new Expense('car-rental', Number.MAX_SAFE_INTEGER), // Max car-rental
      ];

      //Act
      printReport(false, expenses);
      const output = mockStdoutWrite.mock.calls.join('');
      const normalizedOutput = output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize the date (e.g., YYYY-MM-DD)

      //Assert
      expect(normalizedOutput).toMatchSnapshot();

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
      printReport(true, expenses);
      const output = mockStdoutWrite.mock.calls.join('');
      const normalizedOutput = output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize the date (e.g., YYYY-MM-DD)

      // Assert
      expect(normalizedOutput).toMatchSnapshot();

      mockStdoutWrite.mockRestore();
    });
    it('with under and over limit expenses', () => {
      //Arrange
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const expenses: Expense[] = [
        new Expense('dinner', 3000),
        new Expense('breakfast', 500),
        new Expense('car-rental', 10000),
        new Expense('dinner', 5001), // Over-limit dinner
        new Expense('breakfast', 1001), // Over-limit breakfast
        new Expense('car-rental', Number.MAX_SAFE_INTEGER), // Max car-rental
      ];

      //Act
      printReport(true, expenses);
      const output = mockStdoutWrite.mock.calls.join('');
      const normalizedOutput = output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize the date (e.g., YYYY-MM-DD)

      //Assert
      expect(normalizedOutput).toMatchSnapshot();

      mockStdoutWrite.mockRestore();
    });
  });
});
