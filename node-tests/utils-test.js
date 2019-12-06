/* eslint-env jest */
const { getValue } = require('../lib/utils');

test('incorrect type should throw', function() {
  expect(() => getValue(undefined)).toThrow();
  expect(() => getValue(null)).toThrow();
  expect(() => getValue(1)).toThrow();
  expect(() => getValue('a string')).toThrow();
  expect(() => getValue({}, 1)).toThrow();
  expect(() => getValue({}, undefined)).toThrow();
  expect(() => getValue({}, null)).toThrow();
});

test('get value from key as string', function() {
  expect(getValue({ k: 1 }, 'k')).toBe(1);
});

test('key can be separated by "."', function() {
  const obj = {
    a: {
      b: {
        c: 1,
      },
    },
  };
  expect(getValue(obj, 'a.b.c')).toBe(1);
});

test('returns undefiend if not found or is not primitive', function() {
  const obj = {
    a: {
      b: 1,
    },
  };
  expect(getValue(obj, 'a')).toBeUndefined();
  expect(getValue(obj, 'a.c')).toBeUndefined();
  expect(getValue(obj, 'a.b.d')).toBeUndefined();
  expect(getValue(obj, 'a.c.d')).toBeUndefined();
});

test('returns default if not found or is not primitive', function() {
  const obj = {
    a: {
      b: 1,
    },
  };
  expect(getValue(obj, 'a', 2)).toBe(2);
  expect(getValue(obj, 'a.c', 2)).toBe(2);
  expect(getValue(obj, 'a.b.d', 2)).toBe(2);
  expect(getValue(obj, 'a.c.d', 2)).toBe(2);
});
