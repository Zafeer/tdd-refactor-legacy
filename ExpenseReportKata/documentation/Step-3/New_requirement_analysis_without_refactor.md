# New Requirement Analysis Without Refactor

> ## NOTE:
>
> The lunch limit of 2000 as described in [Expense Report Kata](https://github.com/christianhujer/expensereport-level-2?tab=readme-ov-file#expensereport-level-2) does not clearly mention whether they want a capping or just to be marked as an over limit expense. Here we are going with the assumption that no value needs to be capped, but just be displayed with a marker sign.

To implement the new requirement (add a lunch expense type and support JSON output) without refactoring, we would have to add changes in multiple places, leading to more code complication. Here's a detailed breakdown of the required changes:

## 1. Add the Lunch Expense Type

### a. Add a Display Name for Lunch

Update the switch statement to map the type 'lunch' to 'Lunch':

```typescript
switch (expense.type) {
  case 'dinner':
    expenseName = 'Dinner';
    break;
  case 'breakfast':
    expenseName = 'Breakfast';
    break;
  case 'car-rental':
    expenseName = 'Car Rental';
    break;
  case 'lunch': // NEW CASE
    expenseName = 'Lunch';
    break;
}
```

### b. Add a Condition for Meal Expenses

Include lunch in the meal expenses calculation:

```typescript
if (
  expense.type === 'dinner' ||
  expense.type === 'breakfast' ||
  expense.type === 'lunch'
) {
  mealExpenses += expense.amount;
}
```

### c. Add a Condition for Over-Limit Marker

Add the lunch expense type to the over-limit marker logic with a threshold of 2000:

```typescript
let mealOverExpensesMarker =
  (expense.type === 'dinner' && expense.amount > 5000) ||
  (expense.type === 'breakfast' && expense.amount > 1000) ||
  (expense.type === 'lunch' && expense.amount > 2000) // NEW CONDITION
    ? 'X'
    : ' ';
```

## 2. Add JSON as an Output Format

### a. Introduce a New Mode

Update the `printReport` function to handle a `jsonMode` parameter (in addition to `htmlMode`):

```typescript
function printReport(htmlMode: boolean, expenses: Expense[], jsonMode: boolean = false) {
```

### b. Add JSON Output Logic

Include logic to format and output the report in JSON format:

```typescript
if (jsonMode) {
  const report = {
    date: new Date().toISOString().substr(0, 10),
    totalExpenses,
    mealExpenses,
    expenses: expenses.map((expense) => ({
      type: expense.type,
      amount: expense.amount,
      overLimit:
        (expense.type === 'dinner' && expense.amount > 5000) ||
        (expense.type === 'breakfast' && expense.amount > 1000) ||
        (expense.type === 'lunch' && expense.amount > 2000),
    })),
  };
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  return;
}
```

### c. Adjust Existing Output Logic

Add conditions to ensure JSON mode doesn’t conflict with HTML or plain text modes:

```typescript
if (htmlMode && !jsonMode) {
  // Existing HTML output logic
} else if (!htmlMode && !jsonMode) {
  // Existing plain text output logic
}
```
