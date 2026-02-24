function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "leyouj";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "leyouj";
  }

  if (query.toLowerCase().includes("andrewid")) {
    return "leyouj";
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      return Math.max(...intNumbers).toString();
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("plus")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      return intNumbers.reduce((a: number, b: number) => a + b, 0).toString();
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("multiplied")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      return intNumbers.reduce((a: number, b: number) => a * b, 1).toString();
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("minus")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      const [first, ...rest] = intNumbers;
      return rest.reduce((a: number, b: number) => a - b, first).toString();
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("power")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      const [base, exponent] = intNumbers;
      return Math.pow(base, exponent).toString();
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("primes")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      const primes = intNumbers.filter((n: number) => isPrime(n));
      return primes.join(", ");
    }
    return "No numbers found in the query string";
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    const numbers = query.match(/\d+/g);
    if (numbers) {
      const intNumbers = numbers.map((n: string) => parseInt(n, 10));
      return intNumbers.filter((n: number) => Number.isInteger(Math.sqrt(n)) && Number.isInteger(Math.cbrt(n))).toString();
    }
    return "No numbers found in the query string";
  }

  return "";
}
