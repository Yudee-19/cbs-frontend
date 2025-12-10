import { Suspense } from 'react';
import LoadingFallback from '@/components/layouts/LoadingFallback';

const Loadable = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>
) => {
  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
