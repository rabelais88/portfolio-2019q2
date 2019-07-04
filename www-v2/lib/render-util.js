/**
 * HOC context composer
 * @param {Array} wrappers - array of context & prop that will wrap the target children
 * @param {React.Component | function} targetApp - target children to be wrapped
 * @example
 * return(
 * <MyHoc propA={a}>
 *   <MyHoc2 propB="abc">
 *     <MyApp />
 *   </ MyHoc2>
 * </ MyHoc>)
 * this becomes below
 * return compose([
 *  [MyHoc1, { propA: a }],
 *  [MyHoc2, { propB: 'abc'}]
 * ], <MyApp>);
 */
export const wrapAll = (wrappers, targetApp) => {
  return wrappers.reduce((ac, [Hoc, props]) => {
    if (props) return <Hoc {...props}>{ac}</Hoc>;
    return <Hoc>{ac}</Hoc>;
  }, targetApp);
};

export default {
  wrapAll,
};
