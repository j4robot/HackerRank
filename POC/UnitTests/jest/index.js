import sum from './src/__test__/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 4)).toBe(5);
  expect(sum(11, 2)).toBe(14);
});