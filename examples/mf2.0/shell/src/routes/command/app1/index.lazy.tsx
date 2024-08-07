import App1Application from "@remote/app1/router";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/command/app1/")({
	component: () => <App1 />,
});

const App1 = () => {
	return <App1Application />;
};
