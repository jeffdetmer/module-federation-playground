import RouterProvider from "@/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = createRoot(rootEl);
	root.render(
		<StrictMode>
			<RouterProvider />
		</StrictMode>,
	);
}
