

function sum2(a: number, b: number): number {
  return a + b;
}

describe('sum2', () => {
  test('two positive numbers', () => {
    expect(sum2(2, 3)).toBe(5);
  })
});