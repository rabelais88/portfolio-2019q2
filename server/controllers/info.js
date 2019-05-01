import Info from '../../models/Info';

export const infoIndex = app => async (req, res, next) => {
  const indexMarkdown = await Info.getIndex();
  console.log('index requested', indexMarkdown)
  res.status(200).json({ indexMarkdown });
}