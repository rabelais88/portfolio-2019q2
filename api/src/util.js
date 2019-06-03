import Ajv from 'ajv';
import _omitBy from 'lodash/omitBy';
/**
 * @function
 * @param {Object} [schema]
 * @param {Object} [value]
 * @returns {Object} { isValid, errors, value }
 */
export const checkSchema = (schema, value, required = []) => {
  const ajv = new Ajv({ coerceTypes: true });
  if (!schema || !value) throw Error('schema or value is missing');
  if (typeof schema !== 'object' || typeof value !== 'object') throw Error('schema and value must be object');
  if (!Array.isArray(required)) throw Error('required fields must be an array');
  const schemaTemplate = {
    type: 'object',
    properties: schema,
    required,
  };
  const check = ajv.compile(schemaTemplate);
  const isValid = check(value);
  const filtered = _omitBy(value, (v, k) => {
    return !Object.keys(schema).includes(k);
  });
  return {
    isValid,
    errors: ajv.errorsText(check.errors),
    value: filtered,
  };
};
