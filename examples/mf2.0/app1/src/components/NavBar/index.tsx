import { Link } from '@tanstack/react-router';

const NavBar = () => {
  return (
    <ul>
      <Link to="/">Index</Link>
      <Link to="/dashboard">Dashboard</Link>
    </ul>
  );
};

export { NavBar };
