type ExpenseType = 'dinner' | 'breakfast' | 'car-rental';

type ExpenseDetails = {
  name: string;
  limit: number;
  mealCategory: boolean;
};

const ExpenseTypeDetails: Record<ExpenseType, ExpenseDetails> = {
  dinner: { name: 'Dinner', limit: 5000, mealCategory: true },
  breakfast: { name: 'Breakfast', limit: 1000, mealCategory: true },
  'car-rental': { name: 'Car Rental', limit: Infinity, mealCategory: false },
};

class Expense {
  type: ExpenseType;
  amount: number;
  constructor(type: ExpenseType, amount: number) {
    this.type = type;
    this.amount = amount;
  }
}

function getFormattedDate(): string {
  return new Date().toISOString().substr(0, 10);
}

interface ReportFormatter {
  generateHeader(): string;
  generateTableRow(expense: Expense): string;
  generateFooter(totalExpenses: number, mealExpenses: number): string;
}

class HtmlReportFormatter implements ReportFormatter {
  generateHeader(): string {
    return `<!DOCTYPE html>\n<html>\n<head>\n<title>Expense Report: ${getFormattedDate()}</title>\n</head>\n<body>\n<h1>Expense Report: ${getFormattedDate()}</h1>\n<table>\n<thead>\n<tr><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Over Limit</th></tr>\n</thead>\n<tbody>\n`;
  }

  generateTableRow(expense: Expense): string {
    const details = ExpenseTypeDetails[expense.type];
    const overLimitMarker = expense.amount > details.limit ? 'X' : ' ';
    return `<tr><td>${details.name}</td><td>${expense.amount}</td><td>${overLimitMarker}</td></tr>\n`;
  }

  generateFooter(totalExpenses: number, mealExpenses: number): string {
    return `</tbody>\n</table>\n<p>Meal Expenses: ${mealExpenses}</p>\n<p>Total Expenses: ${totalExpenses}</p>\n</body>\n</html>\n`;
  }
}

class PlainTextReportFormatter implements ReportFormatter {
  generateHeader(): string {
    return `Expense Report: ${getFormattedDate()}\n`;
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

function printReport(formatter: ReportFormatter, expenses: Expense[]): void {
  let totalExpenses = 0;
  let mealExpenses = 0;

  if (!formatter || typeof formatter.generateHeader !== 'function') {
    throw new TypeError(
      'Invalid formatter: must implement ReportFormatter interface'
    );
  }

  let output = formatter.generateHeader();

  for (const expense of expenses) {
    if (ExpenseTypeDetails[expense.type].mealCategory) {
      mealExpenses += expense.amount;
    }
    totalExpenses += expense.amount;
    output += formatter.generateTableRow(expense);
  }

  output += formatter.generateFooter(totalExpenses, mealExpenses);
  process.stdout.write(output);
}

export {
  printReport,
  Expense,
  ExpenseType,
  ReportFormatter,
  HtmlReportFormatter,
  PlainTextReportFormatter,
};
