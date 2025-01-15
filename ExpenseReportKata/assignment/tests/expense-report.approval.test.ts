import { describe, expect, it, vi } from 'vitest';
import { printReport, Expense } from '../app/expense-report';

// Helper function to capture stdout
function captureStdout(callback: () => void): string {
  const originalWrite = process.stdout.write;
  let output = '';
  process.stdout.write = (chunk: any) => {
    output += chunk;
    return true;
  };
  try {
    callback();
  } finally {
    process.stdout.write = originalWrite;
  }
  return output;
}

describe('Expense Report - Approval Tests', () => {
  describe('should generate a plain text report with sample expenses using', () => {
    it('captureStdout', () => {
      const expenses: Expense[] = [
        new Expense('dinner', 4500),
        new Expense('breakfast', 700),
        new Expense('car-rental', 12000),
        new Expense('dinner', 5200), // Over-limit dinner
        new Expense('breakfast', 1200), // Over-limit breakfast
      ];

      const output = captureStdout(() => {
        printReport(false, expenses);
      });

      // Normalize dynamic parts (e.g., current date) before snapshot comparison
      const normalizedOutput = output.replace(
        /Expense Report: \d{4}-\d{2}-\d{2}/,
        'Expense Report: <DATE>'
      );

      expect(normalizedOutput).toMatchSnapshot(); // Approve the output manually on first run
    });

    it('spy', () => {
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);

      const expenses: Expense[] = [
        new Expense('dinner', 3000),
        new Expense('breakfast', 500),
        new Expense('car-rental', 10000),
        new Expense('dinner', 5100), // Over-limit dinner
        new Expense('breakfast', 1300), // Over-limit breakfast
      ];

      printReport(false, expenses);

      expect(mockStdoutWrite.mock.calls.join('')).toMatchSnapshot();
      mockStdoutWrite.mockRestore();
    });
  });

  describe('should generate a html report with sample expenses using', () => {
    it('captureStdout', () => {
      const expenses: Expense[] = [
        new Expense('dinner', 4500),
        new Expense('breakfast', 700),
        new Expense('car-rental', 12000),
        new Expense('dinner', 5200), // Over-limit dinner
        new Expense('breakfast', 1200), // Over-limit breakfast
      ];

      const output = captureStdout(() => {
        printReport(true, expenses);
      });

      // Normalize dynamic parts (e.g., current date) before snapshot comparison
      const normalizedOutput = output.replace(
        /Expense Report: \d{4}-\d{2}-\d{2}/g,
        'Expense Report: <DATE>'
      );

      expect(normalizedOutput).toMatchSnapshot(); // Approve the output manually on first run
    });

    it('spy', () => {
      const mockStdoutWrite = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);

      const expenses: Expense[] = [
        new Expense('dinner', 3000),
        new Expense('breakfast', 500),
        new Expense('car-rental', 10000),
        new Expense('dinner', 5100), // Over-limit dinner
        new Expense('breakfast', 1300), // Over-limit breakfast
      ];

      printReport(true, expenses);

      expect(mockStdoutWrite.mock.calls.join('')).toMatchSnapshot();
      mockStdoutWrite.mockRestore();
    });
  });
});
