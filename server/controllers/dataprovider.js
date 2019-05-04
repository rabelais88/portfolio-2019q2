import Info from '../../models/Info';

export const indexProvider = async (req, res, next) => {
  req.dataIndex = await Info.getIndex();
  next(); // actual render is handled by next.js.
  // this cannot be replaced by the instance created from server - i.e.) app.render()
};
