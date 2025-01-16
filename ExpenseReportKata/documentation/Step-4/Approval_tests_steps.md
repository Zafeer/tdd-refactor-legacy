# Approval Tests for Expense Report Generation

This document outlines the steps to write approval tests for the `Expense Report` functionality in the application. The tests ensure that the generated reports (both plain text and HTML formats) match the expected output and ensure full code coverage.

## Tests Overview

The tests cover generating reports with sample expenses in two formats: plain text and HTML. Additionally, there are tests that verify the correct generation of reports using spies to monitor standard output. The tests attempt to cover full coverage using combinations of empty list of expenses, under and over limit expenses.

### 1. Import Required Modules

In each test file, import necessary modules from `vitest` and the application logic (e.g., `printReport` and `Expense` from the application).

```ts
import { describe, expect, it, vi } from 'vitest';
import { printReport, Expense } from '../app/expense-report';
```

### 2. Designing the Tests

When designing tests for the `printReport` functionality, keep the following principles in mind:

1. **Aim for Complete Code Coverage**:

   - Ensure the tests cover all possible scenarios:
     - **Empty expenses**: Validate the output when the list of expenses is empty.
     - **Under-limit expenses**: Verify the behavior when all expenses are within the limit.
     - **Over-limit expenses**: Confirm the output when at least one expense exceeds the limit.
   - Test edge cases and boundary conditions, such as expenses exactly at the limit.

2. **Use Spy to Monitor Output**:

   - Leverage a spy (e.g., `vi.spyOn` in Vitest) to capture and validate the `stdout` output:
     ```typescript
     const mockStdoutWrite = vi
       .spyOn(process.stdout, 'write')
       .mockImplementation(() => true);
     // Call the function
     printReport(true, expenses);
     // Validate the captured output
     expect(mockStdoutWrite.mock.calls.join('')).toMatchSnapshot();
     mockStdoutWrite.mockRestore();
     ```
   - This approach allows you to monitor what is printed without modifying the core logic.

3. **Normalize Date or Inject Static Date**:
   - To prevent dynamic changes in test results caused by varying dates, adopt one of the following strategies:
     - **Normalize the date**: Replace the dynamic date in the output with a placeholder before asserting against snapshots:
       ```typescript
       const output = mockStdoutWrite.mock.calls.join('');
       const normalizedOutput = output.replace(/\d{4}-\d{2}-\d{2}/, '{{DATE}}');
       expect(normalizedOutput).toMatchSnapshot();
       ```
     - **Inject static date**: Refactor the code to accept a date dependency that can be controlled in tests:
       ```typescript
       function printReport(
         includeHeader: boolean,
         expenses: Expense[],
         dateProvider = () => new Date()
       ) {
         const date = dateProvider().toISOString().substr(0, 10);
         // Use the date in the report
       }
       // Pass a mock date provider in the test
       printReport(true, expenses, () => new Date('2025-01-16T00:00:00Z'));
       ```
   - These methods ensure that snapshots are stable and focus only on meaningful changes.

By following these guidelines, your tests will be comprehensive, maintainable, and resilient to changes in the environment or implementation details.

### 4. Writing the tests

#### Test 1: Generate a Plain Text Report

The first test ensures that a plain text report is generated correctly for a sample set of expenses. It uses `spy` to capture the printed output and compares it with a snapshot.

```ts
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
```

#### Test 2: Generate an HTML Report

Similarly, the second test checks the generation of an HTML report for the same set of expenses.

```ts
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
```

### 5. Running the Tests

To run the tests, use the following command:

```bash
npx vitest
```

The first time you run the tests, Vitest will create snapshots of the output. On subsequent runs, it will compare the actual output to the saved snapshots and flag any differences.

### 6. Approving the Tests

If the output changes intentionally (for example, due to changes in the report format or content), you can approve the changes by updating the snapshots:

```bash
npx vitest -u
```

This will overwrite the existing snapshots with the new output.

## Conclusion

These approval tests ensure that the `Expense Report` generation behaves consistently over time. By capturing and comparing the printed output, we can verify that the report generation logic works correctly across different formats and input scenarios.
