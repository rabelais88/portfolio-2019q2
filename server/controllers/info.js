import Info from '../../models/Info';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const infoIndex = async (req, res, next) => {
  const indexMarkdown = await Info.getIndex();
  console.log('controllers/info.js : index requested - ', indexMarkdown);
  res.status(200).json({ indexMarkdown });
};

/**
 * returns stacks list
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const infoStacks = async (req, res, next) => {
  const stacks = await Info.getStacks();
  console.log('controllers/info.js : stack requested - ', stacks);
  res.status(200).json({ stacks });
};
