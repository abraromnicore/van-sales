import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContext } from "@/context/themeContext";
import AppRoutes from "@routes/AppRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeContext.Provider value="system">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
