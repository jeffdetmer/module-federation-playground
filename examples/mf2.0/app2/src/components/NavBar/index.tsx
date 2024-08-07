import { Link } from "@tanstack/react-router";

const NavBar = () => {
	return (
		<ul>
			<Link to="/">Index</Link>
			<Link to="/about">About</Link>
		</ul>
	);
};

export { NavBar };
