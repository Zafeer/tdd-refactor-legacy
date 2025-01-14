import { describe, expect, it, vitest } from 'vitest';
import { printReport, Expense, ExpenseType } from './expense-report';

//Approval-Test-1
describe(`ExpenseReport`, () => {
  it(`should keep its original behavior`, () => {
    let interceptedOutput = '';
    vitest
      .spyOn(process.stdout, 'write')
      .mockImplementation((output: string): boolean => {
        interceptedOutput += output;
        return true;
      });
    printReport(true, [
      new Expense('breakfast', 1000),
      new Expense('breakfast', 1001),
      new Expense('dinner', 5000),
      new Expense('dinner', 5001),
      new Expense('car-rental', 4),
    ]);
    expect(interceptedOutput).toEqual('');
  });
});
