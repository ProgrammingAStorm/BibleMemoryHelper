import { Dispatch, createContext, useContext } from "react";
import { RecordAuthResponse, RecordModel } from "pocketbase";

export interface Authentication extends RecordAuthResponse<RecordModel> {}

interface AuthenticationContext {
  authentication: Authentication;
  setAuthentication: Dispatch<React.SetStateAction<Authentication>>;
}

const AuthenticationContext = createContext<AuthenticationContext>(
  {} as AuthenticationContext
);

const AuthenticationProvider = AuthenticationContext.Provider;

export { AuthenticationProvider, AuthenticationContext };

export function useAuthenticate(): [
  Authentication,
  boolean,
  Dispatch<React.SetStateAction<Authentication>>
] {
  const { authentication, setAuthentication } = useContext(
    AuthenticationContext
  );

  let isAuth = false;
  if (authentication.record) isAuth = true;

  return [authentication, isAuth, setAuthentication];
}
