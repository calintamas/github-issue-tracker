function upperBound(n: number, max: number) {
  return Math.min(n, max);
}

function lowerBound(n: number, min: number) {
  return Math.max(n, min);
}

function bound(n: number, min: number, max: number) {
  return upperBound(lowerBound(n, min), max);
}

export { upperBound, lowerBound, bound };
