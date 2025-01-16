# Refactoring the Tests for `ExpenseReport`

This document outlines the steps to refactor and improve the tests for the `printReport` function.

## 1. Key Goals of the Refactor

1. **Avoid Redundancy**:

   - Eliminate repeated logic (e.g., mocking `process.stdout.write` or normalizing output).
   - Use reusable utility functions for common operations.

2. **Align with Refactored Code**:

   - Utilize the newly introduced formatter classes (`PlainTextReportFormatter`, `HtmlReportFormatter`).

3. **Remove Hardcoded Values**:

   - Utilize the newly introduced `ExpenseType` type.
   - Replace hardcoded values with constants or enums.

## 2. Step-by-Step Refactor

### Step 1: Consolidate Output Capture Logic

Create a helper function for capturing and normalizing `stdout` output:

```typescript
function captureAndNormalizeStdout(callback: () => void): string {
  const mockStdoutWrite = vi
    .spyOn(process.stdout, 'write')
    .mockImplementation(() => true);

  callback();

  const output = mockStdoutWrite.mock.calls.join('');
  mockStdoutWrite.mockRestore();

  return output.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'); // Normalize dates
}

const output = captureAndNormalizeStdout(() => {
  const reportFormatter = new PlainTextReportFormatter();
  printReport(reportFormatter, expenses);
});
```

### Step 2: Align with Refactored Code

Utilize the newly introduced `ExpenseType` and formatter classes (`PlainTextReportFormatter`, `HtmlReportFormatter`):

```typescript
const reportFormatter = new PlainTextReportFormatter();
printReport(reportFormatter, expenses);
```

### Step 3. **Remove Hardcoded Values**:

```typescript
new Expense('dinner', 3000),
```

TO

```typescript
new Expense(ExpenseType.DINNER, 3000),
```
