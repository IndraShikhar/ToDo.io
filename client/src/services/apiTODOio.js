const DEFAULT_API = "http://localhost:3000/api/v1";

const API =
  (import.meta.env.VITE_ENV === "dev"
    ? import.meta.env.VITE_API_LOCALHOST
    : import.meta.env.VITE_API_PRODUCTION) || DEFAULT_API;

export async function attemptLogin(username, password) {
  const result = await fetch(`${API}/user/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  const data = await result.json();

  return data;
}

export async function attemptSignup(user) {
  const result = await fetch(`${API}/user/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });
  const data = await result.json();
  return data;
}

export async function fetchCurrentUser() {
  const result = await fetch(`${API}/user/auth/me`, {
    credentials: "include",
  });
  const data = await result.json();

  return data;
}
export async function updateCurrentUser() {}

export async function logoutUser(id) {
  const result = await fetch(`${API}/user/auth/logout`, {
    credentials: "include",
  });
  const data = await result.json();
  return data;
}

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

export async function updateTask(task) {
  const result = await fetch(`${API}/task/${task._id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  const data = await result.json();
  return data;
}

export async function deleteTask(id) {
  const result = await fetch(`${API}/task/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await result.json();
  return data;
}
