import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { handleUnauthorized } from "./fetchmethods";
import { handleAuthorized } from "./fetchmethods";
import { handleLogin } from "./fetchmethods";
import { handleCustomized } from "./fetchmethods";
import { handleRegister } from "./fetchmethods";
import { handleLogout } from "./fetchmethods";

function App() {
  const [message, setMessage] = useState();
  const [loginStatus, setLoginStatus] = useState();

  return (
    <>
      <h1>Spring Security JWT</h1>
      <Button
        name={"Unauthorized_Message"}
        onClick={() => handleUnauthorized(setMessage)}
      />

      <Button
        name={"Authorized_Message"}
        onClick={() => handleAuthorized(setMessage)}
      />
      {loginStatus === 200 ? (
        <Button
          name={"Logout"}
          onClick={() => handleLogout(setLoginStatus, setMessage)}
        />
      ) : (
        <Button
          name={"Login"}
          onClick={() => handleLogin(setLoginStatus, setMessage)}
        />
      )}

      <Button
        name={"Customized_Message"}
        onClick={() => handleCustomized(setMessage)}
      />
      <Button name={"Register"} onClick={() => handleRegister(setMessage)} />
      <p>{message}</p>
    </>
  );
}

export default App;
