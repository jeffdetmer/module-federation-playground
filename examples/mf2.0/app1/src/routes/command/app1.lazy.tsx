import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/command/app1')({
  component: () => <App1 />,
});

const App1 = () => {
  return <div>Hello App1 /command/app1!</div>;
};
