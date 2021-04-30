export const isPrime = (value) => {
  for (let incrementor = 2; incrementor < value; incrementor++) {
    if (value % incrementor === 0) {
      return false
    }
  }

  return value > 1
}

const isPerfectSquare = (value) => {
  const sr = parseInt(Math.sqrt(value))
  return sr * sr === value
}

export const isFibonacci = (value) =>
  isPerfectSquare(5 * value * value + 4) || isPerfectSquare(5 * value * value - 4)
