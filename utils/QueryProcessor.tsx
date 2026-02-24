function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function normalizedLetters(word: string): string {
  return word.toLowerCase().replace(/\W/g, "").split("").sort().join("");
}

const SCRABBLE_SCORE: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
  m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

function scrabbleScore(word: string): number {
  return word.toLowerCase().replace(/\W/g, "").split("").reduce((sum, c) => sum + (SCRABBLE_SCORE[c] ?? 0), 0);
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

  if (query.toLowerCase().includes("multiplied") && query.toLowerCase().includes("plus")) {
    const lower = query.toLowerCase();
    const terms = lower.split(" plus ");
    let sum = 0;
    for (const term of terms) {
      const numbers = term.match(/\d+/g);
      if (numbers) {
        const intNumbers = numbers.map((n: string) => parseInt(n, 10));
        sum += intNumbers.reduce((a: number, b: number) => a * b, 1);
      }
    }
    return sum.toString();
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
      let result = BigInt(1);
      const b = BigInt(base);
      for (let i = 0; i < exponent; i++) {
        result = result * b;
      }
      return result.toString();
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

  const scrabbleMatch = query.match(/scrabble score of\s+(\S+)/i);
  if (scrabbleMatch) {
    const word = scrabbleMatch[1].replace(/\?$/i, "").trim();
    if (word.length > 0) {
      return scrabbleScore(word).toString();
    }
  }

  const anagramMatch = query.match(/anagram of (\w+):\s*(.+)/i);
  if (anagramMatch) {
    const target = anagramMatch[1].trim();
    const targetNorm = normalizedLetters(target);
    const candidates = anagramMatch[2].split(",").map((w: string) => w.trim().replace(/\?$/i, ""));
    const anagrams = candidates.filter((w: string) => normalizedLetters(w) === targetNorm && w.toLowerCase() !== target.toLowerCase());
    if (anagrams.length > 0) {
      return anagrams.join(", ");
    }
  }

  return "";
}
