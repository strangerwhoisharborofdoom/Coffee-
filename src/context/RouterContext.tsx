import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derive simple route parameters
  const params: Record<string, string> = {};
  if (path.startsWith('/product/')) {
    params.id = path.replace('/product/', '').split('/')[0];
  } else if (path.startsWith('/menu/')) {
    params.category = path.replace('/menu/', '').split('/')[0];
  } else if (path.startsWith('/stores/')) {
    params.id = path.replace('/stores/', '').split('/')[0];
  } else if (path.startsWith('/stories/')) {
    params.slug = path.replace('/stories/', '').split('/')[0];
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};
