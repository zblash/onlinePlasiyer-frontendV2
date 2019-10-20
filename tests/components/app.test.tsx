import { isArray } from '~/utils';

describe('Example Test', () => {
  test('true is equal true', () => {
    expect(isArray([])).toEqual(true);
  });
});
