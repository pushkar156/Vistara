'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  Moon, 
  Sun, 
  User as UserIcon, 
  Compass, 
  Menu, 
  History, 
  Check, 
  Sparkles, 
  LogIn, 
  LogOut, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// ThemeToggle component: strictly Light and Dark themes, no System option in the toggle
const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-full border border-border/40 text-muted-foreground opacity-60"
        disabled
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative h-9 w-9 rounded-full border border-border/50 hover:bg-muted/80 transition-all hover:scale-105 active:scale-95 shadow-xs"
          title={`Theme: ${isDark ? 'Dark' : 'Light'} (Click to change)`}
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-indigo-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-1.5 border-border/60 bg-popover/95 backdrop-blur-md shadow-xl rounded-xl">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm font-medium transition-colors ${
            !isDark 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
          {!isDark && <Check className="ml-auto h-3.5 w-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-lg text-sm font-medium transition-colors ${
            isDark 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
          {isDark && <Check className="ml-auto h-3.5 w-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// UserProfile component: authenticated status, account menu, or sleek Sign In button
const UserProfile = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-border/40" disabled>
        <UserIcon className="h-4 w-4 text-muted-foreground animate-pulse" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        asChild 
        className="h-9 px-3 rounded-full text-xs font-semibold border-border/60 hover:bg-muted/80 transition-all gap-1.5"
      >
        <Link href="/login">
          <LogIn className="h-3.5 w-3.5 text-primary" />
          <span>Sign In</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 rounded-full ring-2 ring-primary/25 hover:ring-primary/50 transition-all overflow-hidden"
          title={user.displayName || user.email || 'My Account'}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 border-border/60 bg-popover/95 backdrop-blur-md shadow-xl rounded-xl">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold text-foreground truncate">{user.displayName || 'Candidate'}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="my-1.5" />
        <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
          <Link href="/profile" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
          <Link href="/history" className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span>Saved Simulations</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1.5" />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="cursor-pointer text-destructive focus:text-destructive rounded-lg flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { user } = useAuth();

  const navLinks = [
    { href: '/', label: 'Simulator', icon: Compass },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/history', label: 'Saved Simulations', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        
        {/* Left: Mobile Trigger & Brand Identity */}
        <div className="flex items-center gap-3">
          {/* Mobile Sheet Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-border/50">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between">
                <div>
                  <SheetHeader className="text-left border-b border-border/40 pb-4 mb-6">
                    <SheetTitle className="flex items-center space-x-2.5">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/30">
                        <Compass className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-headline font-bold text-xl tracking-tight">Vistara</span>
                        <span className="block text-[9px] uppercase tracking-wider font-semibold text-primary -mt-0.5">
                          Career Path Simulator
                        </span>
                      </div>
                    </SheetTitle>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Hackmatrix 5.0 • MISC-01
                      </span>
                    </div>
                  </SheetHeader>

                  {/* Mobile Quick Action */}
                  <div className="mb-6">
                    <Button 
                      asChild 
                      className="w-full justify-center gap-2 rounded-xl bg-primary text-primary-foreground shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/">
                        <Sparkles className="h-4 w-4" />
                        <span>Launch Simulation</span>
                      </Link>
                    </Button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const Icon = link.icon;
                      return (
                        <Button
                          key={link.href}
                          variant={isActive ? "secondary" : "ghost"}
                          className={`justify-between text-sm h-11 px-3 rounded-xl transition-all ${
                            isActive ? 'font-bold text-primary bg-primary/10' : 'text-foreground/80'
                          }`}
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href={link.href}>
                            <span className="flex items-center gap-2.5">
                              <Icon className="h-4 w-4 text-primary" />
                              <span>{link.label}</span>
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                          </Link>
                        </Button>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Drawer Bottom: Theme Switcher & User Auth */}
                <div className="space-y-4 pt-6 border-t border-border/40">
                  {/* Segmented Light / Dark Toggle (No System) */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Appearance
                    </span>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-muted/60 rounded-xl border border-border/40">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme('light')}
                        className={`h-8 rounded-lg text-xs font-medium gap-1.5 transition-all ${
                          resolvedTheme === 'light' 
                            ? 'bg-background shadow-xs text-foreground font-bold' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        <Sun className="h-3.5 w-3.5 text-amber-500" />
                        <span>Light</span>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className={`h-8 rounded-lg text-xs font-medium gap-1.5 transition-all ${
                          resolvedTheme === 'dark' 
                            ? 'bg-background shadow-xs text-foreground font-bold' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        <Moon className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Dark</span>
                      </Button>
                    </div>
                  </div>

                  {/* Auth info in mobile drawer */}
                  <div className="pt-2">
                    {user ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <div className="flex items-center gap-2.5 truncate">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                              {user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs truncate text-foreground font-medium">{user.email}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="h-7 px-2 text-xs"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/profile">Profile</Link>
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full justify-center gap-2 h-9 rounded-xl text-xs font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/login">
                          <LogIn className="h-3.5 w-3.5 text-primary" />
                          <span>Sign In / Register</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop & Tablet Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/30 transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-headline font-bold text-xl tracking-tight text-foreground">
                Vistara
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest font-semibold text-primary -mt-1">
                Career Simulator
              </span>
            </div>
          </Link>

          {/* Track Badge */}
          <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hackmatrix 5.0 • MISC-01</span>
          </div>
        </div>

        {/* Center: Frosted Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderNavPill"
                    className="absolute inset-0 bg-primary rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Theme Toggle, and User Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Simulation CTA */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex h-9 px-3.5 rounded-full text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20 gap-1.5 hover-lift"
          >
            <Link href="/">
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Simulation</span>
            </Link>
          </Button>

          {/* Theme Toggle (Light / Dark only) */}
          <ThemeToggle />

          {/* User Profile / Sign In */}
          <UserProfile />
        </div>

      </div>
    </header>
  );
}
