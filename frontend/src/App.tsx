import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import "./router/AppRouter";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
