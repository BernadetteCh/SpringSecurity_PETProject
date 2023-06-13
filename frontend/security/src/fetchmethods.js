import { Buffer } from "buffer";

const authentication = {
  username: "bernadette",
  password: "1234",
};

const BACKEND_ENDPOINT = "http://localhost:8080";
const BACKEND_MESSAGES = `${BACKEND_ENDPOINT}/messages`;
const BACKEND_LOGIN = `${BACKEND_ENDPOINT}/login`;

export function handleUnauthorized(setMessage) {
  fetch(BACKEND_MESSAGES + "/unauthorized")
    .then((response) => console.log(response))
    .then((text) => console.log(text))
    .catch((error) => console.log("ERROR: " + error));
}

export function handleAuthorized(setMessage) {
  const headers = new Headers();
  const auth = Buffer.from(
    authentication.username + ":" + authentication.password
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

export function handleLogin(setMessage) {
  const headers = new Headers();
  const auth = Buffer.from(
    authentication.username + ":" + authentication.password
  ).toString("base64");
  headers.set("Authorization", "Basic " + auth);
  return fetch(BACKEND_LOGIN, { method: "GET", headers: headers })
    .then((response) => response.text())
    .then((jwt) => {
      setMessage("JWT: " + jwt);
      localStorage.setItem("jwt", jwt);
    })
    .catch((error) => console.log("ERROR: " + error));
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
