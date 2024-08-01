import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/command/app2')({
  component: () => <App2 />,
});

const App2 = () => {
  return <div>Hello /command/app2!</div>;
};
