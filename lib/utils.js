const assert = require('assert');

/**
 * @param {Object} obj
 * @param {string} key
 * @param {string|number|boolean|undefined} defaultValue
 */
function getValue(obj, key, defaultValue) {
  assert.ok(typeof obj === 'object' && obj !== null);
  assert.ok(typeof key === 'string');
  const nestedKeys = key.split('.');
  let target = obj;
  for (let i = 0; i < nestedKeys.length; i++) {
    target = target[nestedKeys[i]];
    if (target === undefined) {
      return defaultValue;
    }
  }
  return isPrimitive(target) ? target : defaultValue;
}

function isPrimitive(test) {
  return test !== Object(test);
}

const filterProps = new Set(['babel', 'project']);
function parseBabelPluginOptions(obj) {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      // babel doesn't like these 2 keys
      if (filterProps.has(key)) {
        return;
      }
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  return JSON.parse(JSON.stringify(obj, getCircularReplacer()));
}

module.exports = {
  getValue,
  parseBabelPluginOptions,
};
