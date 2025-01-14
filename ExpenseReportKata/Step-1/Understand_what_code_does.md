# Purpose

The `printReport` function generates an expense report in either plain text or HTML format based on the `htmlMode` parameter.
It takes a list of `Expense` objects as input and produces a formatted report containing details of the expenses, meal expenses, and the total expenses.

## Key Components

### Data Model

The `Expense` class represents an individual expense with:

- `type` (`ExpenseType`): The category of the expense (`dinner`, `breakfast`, or `car-rental`).
- `amount`: Value of the expense.

### Function: `printReport(htmlMode, expenses)`

#### Parameters

- `htmlMode` (boolean): If `true`, the report is generated in HTML format; otherwise, it is in plain text.
- `expenses` (`Expense[]`): A list of `Expense` objects to include in the report.

#### Logic

1. Initializes `totalExpenses` and `mealExpenses` to zero.
2. Prints the report's header, which includes the title and date.
3. For each expense:
   - Adds meal expenses (for `dinner` and `breakfast`) to `mealExpenses`.
   - Checks if the meal expense exceeds the defined limit:
     - Dinner: 5000
     - Breakfast: 1000
   - Prints the expense details, including an "Over Limit" marker (`'X'`) for expenses exceeding the limit.
   - Adds the expense amount to `totalExpenses`.
4. Prints the total meal expenses and overall expenses at the end.
5. Formats the output based on `htmlMode`.

## How It Works

### HTML vs. Plain Text Mode

- When `htmlMode` is `true`, the function wraps the output in appropriate HTML tags (`<html>`, `<body>`, `<table>`).
- When `htmlMode` is `false`, plain text formatting with tab-separated columns is used.

### Expense Processing

- A switch statement maps `ExpenseType` values to human-readable strings (e.g., `Dinner`, `Breakfast`).
- A conditional determines if a meal expense is over the predefined limit, marking it with an `'X'` in the "Over Limit" column.

### Report Structure

1. **Header**: Title and date.
2. **Table/Details**: Per-expense breakdown with type, amount, and over-limit status.
3. **Summary**: Meal expenses and total expenses.
