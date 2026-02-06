import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShieldAlert className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Authentication Required</h1>
          <p className="text-muted-foreground">You need to log in to access the admin dashboard.</p>
          <Button onClick={login} disabled={loginStatus === 'logging-in'}>
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    );
  }

  if (isCheckingAdmin) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShieldAlert className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
