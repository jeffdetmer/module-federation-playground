declare const router: import('@tanstack/react-router').Router<
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
      readonly CommandApp1LazyRoute: import('@tanstack/react-router').Route<
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
        '/command/app1',
        '/command/app1',
        '/command/app1',
        '/command/app1',
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
  >,
  import('@tanstack/react-router').TrailingSlashOption,
  Record<string, any>,
  Record<string, any>
>;
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
declare const Router: () => import('react/jsx-runtime').JSX.Element;
export default Router;
