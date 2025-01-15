# Incremental Refactoring Steps for Expense Report Generation

> ## NOTE:
>
> Always check on each refactor if the approval test fails or not. On any failure revert back to last green state.

## Step 1: Extract the Date Logic into a Utility Function

```typescript
function getFormattedDate(): string {
  return new Date().toISOString().substr(0, 10);
}
```

## Step 2: Extract the Expense Type Mapping Logic to a Separate Function (Will be refactored later)

```typescript
function getExpenseName(type: ExpenseType): string {
  switch (type) {
    case 'dinner':
      return 'Dinner';
    case 'breakfast':
      return 'Breakfast';
    case 'car-rental':
      return 'Car Rental';
    default:
      throw new Error(`Invalid expense type: ${type}`);
  }
}
```

## Step 3: Refactor the Meal Over Expense Marker Logic into a Function

```typescript
function getMealOverExpenseMarker(expense: Expense): string {
  if (
    (expense.type === 'dinner' && expense.amount > 5000) ||
    (expense.type === 'breakfast' && expense.amount > 1000)
  ) {
    return 'X';
  }
  return ' ';
}
```

## Step 4: Extract the HTML Generation Logic to a Separate Function

```typescript
function generateHtmlReport(
  expenses: Expense[],
  mealExpenses: number,
  totalExpenses: number
): string {
  let htmlContent = '<!DOCTYPE html>\n';
  htmlContent += '<html>\n';
  htmlContent += '<head>\n';
  htmlContent += '<title>Expense Report: ' + getFormattedDate() + '</title>\n';
  htmlContent += '</head>\n';
  htmlContent += '<body>\n';
  htmlContent += '<h1>Expense Report: ' + getFormattedDate() + '</h1>\n';

  htmlContent += '<table>\n';
  htmlContent += '<thead>\n';
  htmlContent +=
    '<tr><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Over Limit</th></tr>\n';
  htmlContent += '</thead>\n';
  htmlContent += '<tbody>\n';

  for (const expense of expenses) {
    const expenseName = getExpenseName(expense.type);
    const mealOverExpensesMarker = getMealOverExpenseMarker(expense);
    htmlContent += `<tr><td>${expenseName}</td><td>${expense.amount}</td><td>${mealOverExpensesMarker}</td></tr>\n`;
  }

  htmlContent += '</tbody>\n';
  htmlContent += '</table>\n';
  htmlContent += `<p>Meal Expenses: ${mealExpenses}</p>\n`;
  htmlContent += `<p>Total Expenses: ${totalExpenses}</p>\n`;
  htmlContent += '</body>\n';
  htmlContent += '</html>\n';

  return htmlContent;
}
```

## Step 5: Extract Plain Text Generation Logic to a Separate Function

```typescript
function generatePlainTextReport(
  expenses: Expense[],
  mealExpenses: number,
  totalExpenses: number
): string {
  let report = 'Expense Report: ' + getFormattedDate() + '\n';

  for (const expense of expenses) {
    const expenseName = getExpenseName(expense.type);
    const mealOverExpensesMarker = getMealOverExpenseMarker(expense);
    report += `${expenseName}\t${expense.amount}\t${mealOverExpensesMarker}\n`;
  }

  report += `Meal Expenses: ${mealExpenses}\n`;
  report += `Total Expenses: ${totalExpenses}\n`;

  return report;
}
```

## Step 6: Simplify the printReport Function

```typescript
function printReport(htmlMode: boolean, expenses: Expense[]) {
  let totalExpenses: number = 0;
  let mealExpenses: number = 0;

  for (const expense of expenses) {
    if (expense.type == 'dinner' || expense.type == 'breakfast') {
      mealExpenses += expense.amount;
    }
    totalExpenses += expense.amount;
  }

  if (htmlMode) {
    process.stdout.write(
      generateHtmlReport(expenses, mealExpenses, totalExpenses)
    );
  } else {
    process.stdout.write(
      generatePlainTextReport(expenses, mealExpenses, totalExpenses)
    );
  }
}
```

## Step 7: Use ExpenseTypeDetails Record to eliminate use of Magic Numbers and group ExpenseType and Limits

```typescript
type ExpenseType = "dinner" | "breakfast" | "car-rental";

type ExpenseDetails = {
name: string;
limit: number;
};

const ExpenseTypeDetails: Record<ExpenseType, ExpenseDetails> = {
dinner: { name: "Dinner", limit: 5000 },
breakfast: { name: "Breakfast", limit: 1000 },
car-rental: { name: "Car Rental", limit: Infinity },
};
```

## Step 8: Update Over-Limit Marker

```typescript
function getMealOverExpenseMarker(expense: Expense): string {
  const details = ExpenseTypeDetails[expense.type];
  return expense.amount > details.limit ? 'X' : ' ';
}
```

## Step 9: Generate Report Rows Using ExpenseTypeDetails

```typescript
function generateTableRow(expense: Expense): string {
  const details = ExpenseTypeDetails[expense.type];
  const overLimitMarker = expense.amount > details.limit ? 'X' : ' ';
  return `${details.name}\t${expense.amount}\t${overLimitMarker}\n`;
}
```

## Step 10: Use a Report Formatter Interface

```typescript
interface ReportFormatter {
  generateHeader(): string;
  generateTableRow(expense: Expense): string;
  generateFooter(totalExpenses: number, mealExpenses: number): string;
}

class HtmlReportFormatter implements ReportFormatter {
  generateHeader(): string {
    return `<!DOCTYPE html><html><head><title>Expense Report</title></head><body><h1>Expense Report</h1><table><thead><tr><th>Type</th><th>Amount</th><th>Over Limit</th></tr></thead><tbody>`;
  }

  generateTableRow(expense: Expense): string {
    const details = ExpenseTypeDetails[expense.type];
    const overLimitMarker = expense.amount > details.limit ? 'X' : ' ';
    return `<tr><td>${details.name}</td><td>${expense.amount}</td><td>${overLimitMarker}</td></tr>`;
  }

  generateFooter(totalExpenses: number, mealExpenses: number): string {
    return `</tbody></table><p>Meal Expenses: ${mealExpenses}</p><p>Total Expenses: ${totalExpenses}</p></body></html>`;
  }
}

class PlainTextReportFormatter implements ReportFormatter {
  generateHeader(): string {
    return 'Expense Report:\n';
  }

  generateTableRow(expense: Expense): string {
    const details = ExpenseTypeDetails[expense.type];
    const overLimitMarker = expense.amount > details.limit ? 'X' : ' ';
    return `${details.name}\t${expense.amount}\t${overLimitMarker}\n`;
  }

  generateFooter(totalExpenses: number, mealExpenses: number): string {
    return `Meal Expenses: ${mealExpenses}\nTotal Expenses: ${totalExpenses}\n`;
  }
}
```

## Step 11: Use Dependency Injection for the Report Formatter

```typescript
function printReport(formatter: ReportFormatter, expenses: Expense[]): void {
  let totalExpenses = 0;
  let mealExpenses = 0;

  let output = formatter.generateHeader();

  for (const expense of expenses) {
    if (expense.type === 'breakfast' || expense.type === 'dinner') {
      mealExpenses += expense.amount;
    }
    totalExpenses += expense.amount;
    output += formatter.generateTableRow(expense);
  }

  output += formatter.generateFooter(totalExpenses, mealExpenses);
  process.stdout.write(output);
}

const formatter = htmlMode
  ? new HtmlReportFormatter()
  : new PlainTextReportFormatter();
printReport(formatter, expenses);
```

## Step 12: Add category to Expenses

```typescript
function printReport(formatter: ReportFormatter, expenses: Expense[]): void {
  let totalExpenses = 0;
  let mealExpenses = 0;

  let output = formatter.generateHeader();

  for (const expense of expenses) {
    if (expense.type === 'breakfast' || expense.type === 'dinner') {
      mealExpenses += expense.amount;
    }
    totalExpenses += expense.amount;
    output += formatter.generateTableRow(expense);
  }

  output += formatter.generateFooter(totalExpenses, mealExpenses);
  process.stdout.write(output);
}

const formatter = htmlMode
  ? new HtmlReportFormatter()
  : new PlainTextReportFormatter();
printReport(formatter, expenses);
```

## Step 13: Add mealCategory to expenseType so as to determine addition for meal expenses

```typescript

const ExpenseTypeDetails: Record<ExpenseType, ExpenseDetails> = {
  dinner: { name: 'Dinner', limit: 5000, mealCategory: true },
  breakfast: { name: 'Breakfast', limit: 1000, mealCategory: true },
  car-rental: { name: 'Car Rental', limit: Infinity, mealCategory: false },
};

function printReport():void
{
    ...
    if (ExpenseTypeDetails[expense.type].mealCategory) {
        mealExpenses += expense.amount;
    }

}

```
