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
  //  headers.set("Authorization", "Basic" + authentication);
  fetch(BACKEND_REGISTER, {
    method: "POST",
    headers: headers,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authentication),
  })
    .then((response) => setMessage(response.status))
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
    .then((response) => response.text())
    .then((text) => setMessage(text))
    .catch((error) => console.log("ERROR: " + error));
}

export function handleLogin(setLoginStatus) {
  const headers = new Headers();
  const auth = Buffer.from(
    authentication.email + ":" + authentication.password
  ).toString("base64");
  headers.set("Authorization", "Basic " + auth);
  return fetch(BACKEND_LOGIN, { method: "GET", headers: headers })
    .then((response) => response.text())
    .then((jwt) => {
      setLoginStatus(200);
      localStorage.setItem("jwt", jwt);
    })
    .catch((error) => console.log("ERROR: " + error));
}

export function handleLogout(setLoginStatus, setMessage) {
  localStorage.clear();
  setLoginStatus(400);
  setMessage("You are logged out");
}

export function handleCustomized(setMessage) {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
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
