import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

//componente Loggin proporcionado por libreria auth0

const LogginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch()

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LogginButton;