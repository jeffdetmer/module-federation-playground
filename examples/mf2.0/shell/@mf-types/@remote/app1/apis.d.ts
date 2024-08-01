
    export type RemoteKeys = '@remote/app1/router';
    type PackageType<T> = T extends '@remote/app1/router' ? typeof import('@remote/app1/router') :any;