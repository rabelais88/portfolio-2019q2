/**
 * enhance targets using provided enhancers
 * @function
 * @param {Object} target
 * @param {Object[]} enhancers
 * @return {Object}
 */
const enhanceAll = (target, enhancers) => {
  if (!Array.isArray(enhancers))
    throw Error('[util/enhanceAll] enhancers should be an array!');
  return enhancers.reduce((ac, cv) => cv(ac), target);
};

module.enhanceAll = enhanceAll;

module.exports = {
  enhanceAll,
};
