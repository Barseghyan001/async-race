import React, { Suspense, type ComponentType } from 'react';
import Loading from '../Loading/Loading.tsx';

export const Loadable = <P extends object>(
  Component: React.LazyExoticComponent<ComponentType<P>>
): React.FC<P> => {
  return (props: P) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
