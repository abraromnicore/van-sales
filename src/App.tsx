import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContext } from '@/context/themeContext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from '@routes/AppRoutes.tsx';
import { GlobalToast } from '@components/common/GlobalToast.tsx';
import { ConfirmDialog } from 'primereact/confirmdialog';

const router = createBrowserRouter(appRoutes);

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeContext.Provider value="system">
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            <GlobalToast />
            <ConfirmDialog />
          </Provider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;