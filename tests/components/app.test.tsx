import { isArray } from '~/utils/deneme';

describe('Example Test', () => {
  test('true is equal true', () => {
    expect(isArray([])).toEqual(true);
  });
});
