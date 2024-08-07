import App2Application from "@remote/app2/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/command/app2/$")({
	component: () => <App2 />,
});

const App2 = () => {
	return <App2Application />;
};
