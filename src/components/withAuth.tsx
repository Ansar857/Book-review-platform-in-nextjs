import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import isClient from '../utils/isClient';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (isClient()) {
        const user = localStorage.getItem('user');
        if (!user) {
          router.push('/login');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
