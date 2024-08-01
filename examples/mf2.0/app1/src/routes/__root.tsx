import { Datadog } from '@/components/Datadog';
import {
  ChakraBaseProvider,
  theme as chakraTheme,
  extendBaseTheme,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const queryClient = new QueryClient();

const {
  Button,
  Container,
  Tabs,
  Breadcrumb,
  Divider,
  Drawer,
  Form,
  Input,
  Spinner,
} = chakraTheme.components;
const theme = extendBaseTheme({
  components: {
    Button,
    Container,
    Tabs,
    Breadcrumb,
    Divider,
    Drawer,
    Form,
    Input,
    Spinner,
  },
});

const Route = createRootRoute({
  component: () => (
    <>
      <Datadog>
        <QueryClientProvider client={queryClient}>
          <ChakraBaseProvider theme={theme}>
            <Outlet />
          </ChakraBaseProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        <div id="title">Environment: App 1 - {process.env.NODE_ENV}</div>
      </Datadog>
    </>
  ),
});

export { Route };
