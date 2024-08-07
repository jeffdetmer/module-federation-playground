import App2Application from "@remote/app2/router";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/command/app2/")({
	component: () => <App2 />,
});

const App2 = () => {
	return <App2Application />;
};
