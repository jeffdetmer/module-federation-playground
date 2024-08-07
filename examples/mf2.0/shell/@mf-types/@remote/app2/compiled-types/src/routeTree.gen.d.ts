import { Route as rootRoute } from './routes/__root';
declare const AboutLazyImport: import("@tanstack/react-router").Route<import("@tanstack/react-router").RootRoute<{}, {}, {}, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, {}, unknown>, "/about", "/about", "/about", "/about", Record<string, unknown>, {}, {}, {}, {}, Record<never, string>, Record<never, string>, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, unknown>;
declare const IndexLazyImport: import("@tanstack/react-router").Route<import("@tanstack/react-router").RootRoute<{}, {}, {}, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, {}, unknown>, "/", "/", "/", "/", Record<string, unknown>, {}, {}, {}, {}, Record<never, string>, Record<never, string>, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, unknown>;
declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/': {
            id: '/';
            path: '/';
            fullPath: '/';
            preLoaderRoute: typeof IndexLazyImport;
            parentRoute: typeof rootRoute;
        };
        '/about': {
            id: '/about';
            path: '/about';
            fullPath: '/about';
            preLoaderRoute: typeof AboutLazyImport;
            parentRoute: typeof rootRoute;
        };
    }
}
export declare const routeTree: import("@tanstack/react-router").RootRoute<{}, {}, {}, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, {}, {
    readonly IndexLazyRoute: import("@tanstack/react-router").Route<import("@tanstack/react-router").RootRoute<{}, {}, {}, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, {}, unknown>, "/", "/", "/", "/", Record<string, unknown>, {}, {}, {}, {}, Record<never, string>, Record<never, string>, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, unknown>;
    readonly AboutLazyRoute: import("@tanstack/react-router").Route<import("@tanstack/react-router").RootRoute<{}, {}, {}, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, {}, unknown>, "/about", "/about", "/about", "/about", Record<string, unknown>, {}, {}, {}, {}, Record<never, string>, Record<never, string>, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, import("@tanstack/react-router").RouteContext, {}, {}, {}, unknown>;
}>;
export {};
