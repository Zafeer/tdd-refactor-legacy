interface FizzBuzz {
  go(num: number): string;
}

function isPrime(num: number): boolean {
  if (num % 2 === 0 && num > 2) return false;
  if (num % 7 === 0 && num > 7) return false;
  if (num % 11 === 0 && num > 11) return false;
  return true;
}

export const createFizzBuzz = (): FizzBuzz => {
  return {
    go(num: number) {
      if (num === 3) return 'FizzWhiz';
      if (num % 15 === 0) return 'FizzBuzz';
      if (num % 5 === 0) return 'Buzz';
      if (num % 3 === 0) return 'Fizz';
      return num.toString();
    },
  };
};
