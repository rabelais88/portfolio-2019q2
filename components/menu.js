import Go from './go';

export default props => {
  return (
    <div>
      <Go to="/">index</Go>
      <Go to="/about">about</Go>
      <Go to="/login">login</Go>
      <Go to="/admin">admin</Go>
    </div>
  );
};
