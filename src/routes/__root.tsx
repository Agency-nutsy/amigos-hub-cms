import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { FloatingWidgets } from "../components/FloatingWidgets";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amigos Hub — Satya Niketan's loudest, friendliest cafe since 2014" },
      { name: "description", content: "Burgers, shakes, mojitos and momos in the heart of DU South Campus. Graffiti walls, fairy lights, and pocket-friendly comfort food since 2014." },
      { name: "author", content: "Amigos Hub" },
      { property: "og:title", content: "Amigos Hub Cafe · Satya Niketan" },
      { property: "og:description", content: "DU South Campus's beloved hangout — burgers, shakes, momos & mojitos since 2014." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bowlby+One&family=Caveat:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalLoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center overflow-hidden grain"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-6 drop-shadow-xl"
            >
              <img src="/logo.avif" alt="Amigos Hub Logo" className="h-32 sm:h-40 w-auto object-contain" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="font-display text-5xl md:text-7xl text-charcoal tracking-tight uppercase"
            >
              Amigos Hub
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 font-script text-3xl text-coral flex items-center gap-2"
            >
              <span className="w-8 h-[3px] bg-coral/50 rounded-full animate-pulse"></span>
              warming up the grill...
              <span className="w-8 h-[3px] bg-coral/50 rounded-full animate-pulse"></span>
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "240px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="mt-10 h-3 rounded-full stripe-pillar shadow-inner"
            />
          </div>
          
          {/* Paper grain overlay handled by .grain class */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CircleTransition() {
  const [phase, setPhase] = useState<'idle' | 'closing' | 'opening'>('idle');
  const router = useRouter();

  useEffect(() => {
    const handleNav = (e: CustomEvent) => {
      const { path } = e.detail;
      if (phase !== 'idle') return;

      setPhase('closing');
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (router.state.location.pathname !== path) {
           router.navigate({ to: path });
        }
        
        setPhase('opening');
        
        setTimeout(() => {
          setPhase('idle');
        }, 700);
      }, 600);
    };
    
    window.addEventListener('nav-click', handleNav as EventListener);
    return () => window.removeEventListener('nav-click', handleNav as EventListener);
  }, [router, phase]);

  if (phase === 'idle') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0 block">
        <defs>
          <mask id="holeMask">
            <rect width="100%" height="100%" fill="white" />
            {phase === 'opening' && (
              <motion.circle 
                cx="50%" cy="50%" fill="black"
                initial={{ r: 0 }}
                animate={{ r: "150vmax" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />
            )}
          </mask>
        </defs>
        
        {phase === 'closing' ? (
          <motion.circle 
            cx="50%" cy="50%" fill="#FF6B6B"
            initial={{ r: 0 }}
            animate={{ r: "150vmax" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        ) : (
          <rect width="100%" height="100%" fill="#FF6B6B" mask="url(#holeMask)" />
        )}
      </svg>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoadingScreen />
      <CircleTransition />
      <div className="flex min-h-screen flex-col bg-charcoal">
        <SiteNav />
        <div className="flex-1 flex flex-col bg-cream">
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </div>
      <FloatingWidgets />
    </QueryClientProvider>
  );
}
