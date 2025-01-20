export class stringCalculator {
  add(input: string) {
    if (input.length === 0) return 0;
    if (input.includes(',')) {
      return input.split(',').reduce((acc, num) => acc + parseInt(num), 0);
    }
    return parseInt(input);
  }
}
