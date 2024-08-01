import { routeTree } from '@remote/app1/router';
import {
  RouterProvider,
  createLazyFileRoute,
  createRouter,
} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/command/app1')({
  component: () => <App1 />,
});

const App1 = () => {
  return <RouterProvider router={router} />;
};
