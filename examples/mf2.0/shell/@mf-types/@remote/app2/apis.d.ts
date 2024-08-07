
    export type RemoteKeys = '@remote/app2/router';
    type PackageType<T> = T extends '@remote/app2/router' ? typeof import('@remote/app2/router') :any;