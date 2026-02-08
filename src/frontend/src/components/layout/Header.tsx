import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AuthButtons from '../auth/AuthButtons';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { brandConfig } from '../../config/brand';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Categories', path: '/categories' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleApplyNow = () => {
    navigate({ to: '/jobs' });
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/generated/brand-logo.dim_512x128.png"
              alt={brandConfig.company.name}
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{ className: 'text-primary font-semibold' }}
              >
                {link.label}
              </Link>
            ))}
            <Button onClick={handleApplyNow} size="sm" className="ml-2">
              Apply Now
            </Button>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}
            <AuthButtons />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <AuthButtons />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                      activeProps={{ className: 'text-primary font-semibold' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button onClick={handleApplyNow} className="mt-2">
                    Apply Now
                  </Button>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
