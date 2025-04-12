import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import "./router/AppRouter";
import { AppRouter } from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
