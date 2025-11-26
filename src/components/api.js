// src/components/api.js
const MOCKAPI = "https://69185d5e21a96359486fcf5b.mockapi.io/players";

const isSuccess = (status) => status >= 200 && status < 300;

export async function fetchPlayers() {
  const res = await fetch(MOCKAPI, {
    headers: { "content-type": "application/json" },
  });
  if (!isSuccess(res.status)) {
    throw new Error(`status: ${res.status}`);
  }
  return res.json();
}

export async function fetchPlayer(id) {
  const res = await fetch(`${MOCKAPI}/${id}`, {
    headers: { "content-type": "application/json" },
  });
  if (!isSuccess(res.status)) {
    throw new Error(`status: ${res.status}`);
  }
  return res.json();
}

export async function createPlayer(body) {
  const res = await fetch(MOCKAPI, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!isSuccess(res.status)) {
    throw new Error(`status: ${res.status}`);
  }
  return res.json();
}

export async function updatePlayer(id, body) {
  const res = await fetch(`${MOCKAPI}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!isSuccess(res.status)) {
    throw new Error(`status: ${res.status}`);
  }
  return res.json();
}

export async function deletePlayer(id) {
  const res = await fetch(`${MOCKAPI}/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  if (!isSuccess(res.status)) {
    throw new Error(`status: ${res.status}`);
  }
  return res.json();
}
