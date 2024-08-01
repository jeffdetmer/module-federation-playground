import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
  component: () => <Login />,
});

const Login = () => {
  return <div>Hello /login!</div>;
};
