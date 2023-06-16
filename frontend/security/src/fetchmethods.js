import { Buffer } from "buffer";

const authentication = {
  firstName: "bernadette",
  email: "bernadette@gmail.com",
  password: "1234",
};

const BACKEND_ENDPOINT = "http://localhost:8080";
const BACKEND_MESSAGES = `${BACKEND_ENDPOINT}/messages`;
const BACKEND_LOGIN = `${BACKEND_ENDPOINT}/login`;
const BACKEND_REGISTER = `${BACKEND_ENDPOINT}/register`;

export function handleUnauthorized(setMessage) {
  fetch(BACKEND_MESSAGES + "/unauthorized")
    .then((response) => response.text())
    .then((text) => setMessage("You are not authorized to be here"))
    .catch((error) => console.log("ERROR: " + error));
}

export function handleRegister(setMessage) {
  const headers = new Headers();
  fetch(BACKEND_REGISTER, {
    method: "POST",
    headers: headers,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authentication),
  })
    .then((response) =>
      response.status === 201
        ? setMessage("Thank's for registraion")
        : setMessage(
            "It seems like you are already registered, please try to login"
          )
    )
    .catch((error) => console.log(`ERROR` + error));
}

export function handleAuthorized(setMessage) {
  const headers = new Headers();
  const auth = Buffer.from(
    authentication.email + ":" + authentication.password
  ).toString("base64");
  headers.set("Authorization", "Basic " + auth);
  return fetch(BACKEND_MESSAGES + "/authorized", {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.status === 401) {
        return "You are not authorized to be here yet, please login or register";
      } else {
        return response.text();
      }
    })
    .then((text) => setMessage(text))
    .catch((error) => console.log("ERROR: " + error));
}

export function handleLogin(setLoginStatus, setMessage) {
  const headers = new Headers();
  const auth = Buffer.from(
    authentication.email + ":" + authentication.password
  ).toString("base64");
  headers.set("Authorization", "Basic " + auth);
  return fetch(BACKEND_LOGIN, { method: "GET", headers: headers })
    .then((response) => {
      console.log(response);
      if (response.status === 401) {
        setLoginStatus(response.status);
        setMessage(
          "You are not registered yet, please register before you try to login"
        );
        return;
      } else {
        setLoginStatus(response.status);
        setMessage("Thank you for logging in ");
        return response.text();
      }
    })
    .then((jwt) => {
      localStorage.setItem("jwt", jwt);
    })
    .catch((error) => console.log("ERROR: " + error));
}

export function handleLogout(setLoginStatus, setMessage) {
  window.localStorage.clear();
  setLoginStatus(400);
  setMessage("You are logged out");
}

export function handleCustomized(setMessage) {
  const jwt = localStorage.getItem("jwt");
  if (!jwt || jwt == undefined) {
    setMessage("JWT is not provided");
    return;
  }
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${jwt}`);
  return fetch(BACKEND_MESSAGES + "/authorized/customized", {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.text())
    .then((text) => setMessage(text))
    .catch((error) => console.log("ERROR: " + error));
}
