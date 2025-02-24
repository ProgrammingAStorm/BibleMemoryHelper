import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthenticate } from "../hooks/useAuthenticate";

export default function Home() {
  const navigate = useNavigate();
  const [_, isAuth] = useAuthenticate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return <main>home</main>;
}
