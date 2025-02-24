import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  Authentication,
  AuthenticationProvider,
} from "./hooks/useAuthenticate";
import { useState } from "react";

function App() {
  const [authentication, setAuthentication] = useState<Authentication>(
    {} as Authentication
  );

  return (
    <AuthenticationProvider value={{ authentication, setAuthentication }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
