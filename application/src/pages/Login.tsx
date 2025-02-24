import { useNavigate } from "react-router";
import { useAuthenticate } from "../hooks/useAuthenticate";
import login from "../../db/login";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [_, isAuth, setAuthentication] = useAuthenticate();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <main>
      <form onSubmit={submitHandler}>
        <input placeholder="Email" name="email" type="email" />
        <input placeholder="Password" name="password" type="password" />
        <button>Login</button>
        {message}
      </form>
    </main>
  );

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    await login(
      target.email.value,
      target.password.value,
      (value) => setAuthentication(value),
      (_) => {
        setMessage("Credentials failed");
      }
    );
  }
}
