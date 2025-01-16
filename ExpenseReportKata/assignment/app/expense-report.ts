const ExpenseType = {
  DINNER: 'dinner',
  BREAKFAST: 'breakfast',
  CAR_RENTAL: 'car-rental',
  LUNCH: 'lunch',
} as const;

type ExpenseType = (typeof ExpenseType)[keyof typeof ExpenseType];

/*
OR
enum ExpenseType {
  DINNER = 'dinner',
  BREAKFAST = 'breakfast',
  CAR_RENTAL = 'car-rental',
}
 */

type ExpenseDetails = {
  name: string;
  limit: number;
  mealCategory: boolean;
};

const ExpenseTypeDetails: Record<ExpenseType, ExpenseDetails> = {
  [ExpenseType.DINNER]: { name: 'Dinner', limit: 5000, mealCategory: true },
  [ExpenseType.BREAKFAST]: {
    name: 'Breakfast',
    limit: 1000,
    mealCategory: true,
  },
  [ExpenseType.CAR_RENTAL]: {
    name: 'Car Rental',
    limit: Infinity,
    mealCategory: false,
  },
  [ExpenseType.LUNCH]: {
    name: 'Lunch',
    limit: 2000,
    mealCategory: true,
  },
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

function getMealOverExpenseMarker(expense: Expense): string {
  return expense.amount > ExpenseTypeDetails[expense.type].limit ? 'X' : ' ';
}

function getExpenseName(expense: Expense): string {
  return ExpenseTypeDetails[expense.type].name;
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
    const expenseName = getExpenseName(expense);
    const overLimitMarker = getMealOverExpenseMarker(expense);
    return `<tr><td>${expenseName}</td><td>${expense.amount}</td><td>${overLimitMarker}</td></tr>\n`;
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
    const expenseName = getExpenseName(expense);
    const overLimitMarker = getMealOverExpenseMarker(expense);
    return `${expenseName}\t${expense.amount}\t${overLimitMarker}\n`;
  }

  generateFooter(totalExpenses: number, mealExpenses: number): string {
    return `Meal Expenses: ${mealExpenses}\nTotal Expenses: ${totalExpenses}\n`;
  }
}

function printReport(formatter: ReportFormatter, expenses: Expense[]): void {
  let totalExpenses = 0;
  let mealExpenses = 0;

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
  ExpenseTypeDetails,
  ReportFormatter,
  HtmlReportFormatter,
  PlainTextReportFormatter,
};
