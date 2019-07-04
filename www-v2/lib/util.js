/**
 * enhance targets using provided enhancers
 * @function
 * @param {Object} target - target to attach enhancers
 * @param {Object[]} enhancers - array of enhancers
 * @return {Object}
 * @example
 * export default withEnhancer2(withEnhancer1(MyApp)) // this becomes below
 * export default enhanceAll(MyApp, [withEnhancer1, withEnhancer2]);
 */
const enhanceAll = (target, enhancers) => {
  if (!Array.isArray(enhancers)) {
    throw Error('[util/enhanceAll] enhancers should be an array!');
  }
  return enhancers.reduce((ac, cv) => cv(ac), target);
};

module.enhanceAll = enhanceAll;

module.exports = {
  enhanceAll,
};
