import { Route as rootRoute } from './routes/__root';
declare const DashboardLazyImport: import('@tanstack/react-router').Route<
  import('@tanstack/react-router').RootRoute<
    {},
    {},
    {},
    import('@tanstack/react-router').RouteContext,
    import('@tanstack/react-router').RouteContext,
    {},
    {},
    {},
    {},
    unknown
  >,
  '/dashboard',
  '/dashboard',
  '/dashboard',
  '/dashboard',
  Record<string, unknown>,
  {},
  {},
  {},
  {},
  Record<never, string>,
  Record<never, string>,
  import('@tanstack/react-router').RouteContext,
  import('@tanstack/react-router').RouteContext,
  import('@tanstack/react-router').RouteContext,
  {},
  {},
  {},
  unknown
>;
declare const IndexLazyImport: import('@tanstack/react-router').Route<
  import('@tanstack/react-router').RootRoute<
    {},
    {},
    {},
    import('@tanstack/react-router').RouteContext,
    import('@tanstack/react-router').RouteContext,
    {},
    {},
    {},
    {},
    unknown
  >,
  '/',
  '/',
  '/',
  '/',
  Record<string, unknown>,
  {},
  {},
  {},
  {},
  Record<never, string>,
  Record<never, string>,
  import('@tanstack/react-router').RouteContext,
  import('@tanstack/react-router').RouteContext,
  import('@tanstack/react-router').RouteContext,
  {},
  {},
  {},
  unknown
>;
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard': {
      id: '/dashboard';
      path: '/dashboard';
      fullPath: '/dashboard';
      preLoaderRoute: typeof DashboardLazyImport;
      parentRoute: typeof rootRoute;
    };
  }
}
export declare const routeTree: import('@tanstack/react-router').RootRoute<
  {},
  {},
  {},
  import('@tanstack/react-router').RouteContext,
  import('@tanstack/react-router').RouteContext,
  {},
  {},
  {},
  {},
  {
    readonly IndexLazyRoute: import('@tanstack/react-router').Route<
      import('@tanstack/react-router').RootRoute<
        {},
        {},
        {},
        import('@tanstack/react-router').RouteContext,
        import('@tanstack/react-router').RouteContext,
        {},
        {},
        {},
        {},
        unknown
      >,
      '/',
      '/',
      '/',
      '/',
      Record<string, unknown>,
      {},
      {},
      {},
      {},
      Record<never, string>,
      Record<never, string>,
      import('@tanstack/react-router').RouteContext,
      import('@tanstack/react-router').RouteContext,
      import('@tanstack/react-router').RouteContext,
      {},
      {},
      {},
      unknown
    >;
    readonly DashboardLazyRoute: import('@tanstack/react-router').Route<
      import('@tanstack/react-router').RootRoute<
        {},
        {},
        {},
        import('@tanstack/react-router').RouteContext,
        import('@tanstack/react-router').RouteContext,
        {},
        {},
        {},
        {},
        unknown
      >,
      '/dashboard',
      '/dashboard',
      '/dashboard',
      '/dashboard',
      Record<string, unknown>,
      {},
      {},
      {},
      {},
      Record<never, string>,
      Record<never, string>,
      import('@tanstack/react-router').RouteContext,
      import('@tanstack/react-router').RouteContext,
      import('@tanstack/react-router').RouteContext,
      {},
      {},
      {},
      unknown
    >;
  }
>;
export {};
