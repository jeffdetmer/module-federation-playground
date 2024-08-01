import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/dashboard')({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  return <div>Hello App1 /dashboard!</div>;
};
