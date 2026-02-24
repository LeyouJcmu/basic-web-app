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

  if (query.toLowerCase().includes("Which of the following numbers is the largest")) {
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

  return "";
}
