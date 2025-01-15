import { describe, expect, it } from 'vitest';
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

describe('Expense Report - Plain Text', () => {
  it('should generate a plain text report with sample expenses', () => {
    const expenses: Expense[] = [
      { type: 'dinner', amount: 4500 },
      { type: 'breakfast', amount: 700 },
      { type: 'car-rental', amount: 12000 },
      { type: 'dinner', amount: 5200 }, // Over-limit dinner
      { type: 'breakfast', amount: 1200 }, // Over-limit breakfast
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
});

describe('Expense Report - HTML', () => {
  it('should generate an HTML report with sample expenses', () => {
    const expenses: Expense[] = [
      { type: 'dinner', amount: 4500 },
      { type: 'breakfast', amount: 700 },
      { type: 'car-rental', amount: 12000 },
      { type: 'dinner', amount: 5200 }, // Over-limit dinner
      { type: 'breakfast', amount: 1200 }, // Over-limit breakfast
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
});
