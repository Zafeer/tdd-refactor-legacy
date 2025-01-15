# Approval Tests for Expense Report Generation

This document outlines the steps to write approval tests for the `Expense Report` functionality in the application. The tests ensure that the generated reports (both plain text and HTML formats) match the expected output.

## Tests Overview

The tests cover generating reports with sample expenses in two formats: plain text and HTML. Additionally, there are tests that verify the correct generation of reports using spies to monitor standard output.

### 1. Import Required Modules

In each test file, import necessary modules from `vitest` and the application logic (e.g., `printReport` and `Expense` from the application).

```ts
import { describe, expect, it, vi } from 'vitest';
import { printReport, Expense } from '../app/expense-report';
```

### 2. Helper Function to Capture `stdout`

To capture the output that would normally be printed to the console, use a helper function `captureStdout`. This function overrides `process.stdout.write` to capture the output and return it as a string.

```ts
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
```

### 3. Writing the Tests

#### Test 1: Generate a Plain Text Report

The first test ensures that a plain text report is generated correctly for a sample set of expenses. It uses `captureStdout` to capture the printed output and compares it with a snapshot.

```ts
it('should generate a plain text report with sample expenses', () => {
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
```

#### Test 2: Generate an HTML Report

Similarly, the second test checks the generation of an HTML report for the same set of expenses.

```ts
it('should generate an HTML report with sample expenses', () => {
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
```

#### Test 3: Using Spy for Plain Text Report

The third test uses `vi.spyOn` to monitor the `stdout.write` method and generate a plain text report. This allows the test to capture the exact calls made to `stdout`.

```ts
it('should generate plain text report correctly using spy', () => {
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
```

#### Test 4: Using Spy for HTML Report

This test uses the same spy technique but for an HTML report.

```ts
it('should generate HTML report correctly using spy', () => {
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
```

### 4. Running the Tests

To run the tests, use the following command:

```bash
npx vitest
```

The first time you run the tests, Vitest will create snapshots of the output. On subsequent runs, it will compare the actual output to the saved snapshots and flag any differences.

### 5. Approving the Tests

If the output changes intentionally (for example, due to changes in the report format or content), you can approve the changes by updating the snapshots:

```bash
npx vitest -u
```

This will overwrite the existing snapshots with the new output.

## Conclusion

These approval tests ensure that the `Expense Report` generation behaves consistently over time. By capturing and comparing the printed output, we can verify that the report generation logic works correctly across different formats and input scenarios.
