import React from 'react';

const Loader = () => (<div>Loading...</div>)

const loadComponent = (scope, module) => async () => {
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');

  const container = window[scope];

  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);

  const factory = await window[scope].get(module);
  const Module = factory();

  return Module;
};

const useDynamicScript = ({ url }) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    // eslint-disable-next-line consistent-return
    return () => {
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const MicroFrontend = React.memo(({ remote }) => {
  const { ready, failed } = useDynamicScript({
    url: remote && remote.url,
  });

  if (!remote) {
    throw new Error('Remote not found');
  }

  if (!ready) {
    return <Loader />;
  }

  if (failed) {
    throw new Error('Remote not found');
  }

  const Component = React.lazy(loadComponent(remote.scope, remote.module));

  return <Component />;
});

export default MicroFrontend;