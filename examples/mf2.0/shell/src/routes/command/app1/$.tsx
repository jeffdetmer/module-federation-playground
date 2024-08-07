import App1Application from '@remote/app1/router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/command/app1/$')({
  component: () => <App1 />,
});

const App1 = () => {
  return <App1Application />;
};
