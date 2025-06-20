import { useTask } from "../contexts/TaskContext";

const API =
  import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_API_LOCALHOST
    : import.meta.env.VITE_API_PRODUCTION;

export async function attemptLogin(username, password) {
  console.log(API);
  const result = await fetch(`${API}/user/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  const data = await result.json();
  console.log(data);

  return data;
}
export async function attemptSignup() {}
export async function fetchCurrentUser() {
  const result = await fetch(`${API}/user/auth/me`, {
    credentials: "include",
  });
  const data = await result.json();

  return data;
}
export async function updateCurrentUser() {}

export async function fetchCurrentUserTasks() {
  const result = await fetch(`${API}/task`, {
    credentials: "include",
  });
  const data = await result.json();
  return data;
}

export async function createTask(title, description) {
  const result = await fetch(`${API}/task`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  const data = await result.json();
  return data;
}
