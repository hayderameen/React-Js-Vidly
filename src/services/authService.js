import config from "./../config.json";
import jwtDecode from "jwt-decode";

export function loginAuth(token) {
  localStorage.setItem(config.tokenKeyTitle, token);
  window.location = "/"; // To reload the app properly after logging in
}

export function logoutAuth() {
  localStorage.removeItem(config.tokenKeyTitle);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(config.tokenKeyTitle);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getCurrentToken() {
  return localStorage.getItem(config.tokenKeyTitle);
}
