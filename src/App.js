import Screen from "./components/LoginPage/Screen";
import UserProvider from "./store/UserProvider";

function App() {
  return (
    <UserProvider>
      <Screen />
    </UserProvider>
  );
}

export default App;
