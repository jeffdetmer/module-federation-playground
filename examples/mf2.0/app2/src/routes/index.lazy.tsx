import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: () => <Index />,
});

const Index = () => {
	return <div>Hello App2 /!</div>;
};
