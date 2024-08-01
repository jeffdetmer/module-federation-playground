export type RemoteKeys = 'app1/routeTree';
type PackageType<T> = T extends 'app1/routeTree'
  ? typeof import('app1/routeTree')
  : any;
