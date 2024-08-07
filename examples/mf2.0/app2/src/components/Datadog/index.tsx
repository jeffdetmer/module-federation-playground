import { type ReactNode, useEffect } from 'react';
import { datadogRum } from './init';

const Datadog = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    datadogRum.setUser({
      id: '',
    });
  });

  return children;
};

export { Datadog };
