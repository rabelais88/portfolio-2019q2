import Info from '../../models/Info';

export const indexProvider = app => async (req, res, next) => {
  req.dataIndex = await Info.getIndex();
  app.render(req, res, '/');
  // next(); // actual render is handled by next.js.
  // this cannot be replaced by the instance created from server - i.e.) app.render()
};
