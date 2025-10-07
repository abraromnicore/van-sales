import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContext } from '@/context/themeContext';
import AppRoutes from '@routes/AppRoutes';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeContext.Provider value="system">
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
