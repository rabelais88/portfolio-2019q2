export const enhance = (component, enhancers) => {
  if (!Array.isArray(enhancers)) throw new Error('must provide an array for enhancing');
  return enhancers.reduce((ac, cv) => cv(ac), component);
};
