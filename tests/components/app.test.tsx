import { isArray } from '~/utils';

describe('Example Test', () => {
  test('Is Array', () => {
    expect(isArray([])).toEqual(true);
  });
});
