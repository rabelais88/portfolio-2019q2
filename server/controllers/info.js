import Info from '../../models/Info';

/**
 * returns index page markdown
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {Function} [next]
 */
export const infoIndex = async (req, res, next) => {
  const indexMarkdown = await Info.getIndex();
  console.log('index requested', indexMarkdown);
  res.status(200).json({ indexMarkdown });
};
