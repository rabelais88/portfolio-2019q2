import Info from '../../models/Info';

export const indexProvider = async (req, res, _next) => {
  req.dataIndex = await Info.getIndex();
  _next();
};
