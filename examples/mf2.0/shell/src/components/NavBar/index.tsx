import { Link } from '@tanstack/react-router';

const NavBar = () => {
  return (
    <ul>
      <Link to="/">Shell</Link>
      <Link to="/command/app1">App 1</Link>
      <Link to="/command/app2">App 2</Link>
    </ul>
  );
};

export { NavBar };
