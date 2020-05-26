type Operation = 'multiply' | 'add' | 'divide';
type Result = number | string

export const calculator = (a: number, b: number, op : Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) {
        throw new Error('Can\'t divide by 0!');
      }
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

calculator(a, b, 'divide');