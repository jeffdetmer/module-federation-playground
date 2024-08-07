import { Button } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

const NavBar = () => {
	return (
		<>
			<Link to="/">
				{({ isActive }) => (
					<Button colorScheme="teal" variant="solid" isActive={isActive}>
						Shell
					</Button>
				)}
			</Link>
			<Link to="/command/app1">
				{({ isActive }) => (
					<Button colorScheme="teal" variant="solid" isActive={isActive}>
						App 1
					</Button>
				)}
			</Link>
			<Link to="/command/app2">
				{({ isActive }) => (
					<Button colorScheme="teal" variant="solid" isActive={isActive}>
						App 2
					</Button>
				)}
			</Link>
		</>
	);
};

export { NavBar };
