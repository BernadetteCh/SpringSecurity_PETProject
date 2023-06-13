import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { handleUnauthorized } from "./fetchmethods";
import { handleAuthorized } from "./fetchmethods";
import { handleLogin } from "./fetchmethods";
import { handleCustomized } from "./fetchmethods";

function App() {
  const [message, setMessage] = useState();
  return (
    <>
      <h1>Spring Securitey JWT</h1>
      <Button
        name={"Unauthorized_Message"}
        onClick={() => handleUnauthorized(setMessage)}
      />
      <Button
        name={"Authorized_Message"}
        onClick={() => handleAuthorized(setMessage)}
      />
      <Button name={"Login"} onClick={() => handleLogin(setMessage)} />
      <Button
        name={"Customized_Message"}
        onClick={() => handleCustomized(setMessage)}
      />
      <p>{message}</p>
    </>
  );
}

export default App;
