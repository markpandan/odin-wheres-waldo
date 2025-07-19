const HOST_NAME = "http://localhost:5000";

export const fetchGet = async (route, signal, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    signal,
  });
};

export const fetchPost = async (route, body, signal, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    signal,
    body: JSON.stringify(body),
  });
};

export const fetchPut = async (route, body, signal, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "PUT",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors",
    signal,
  });
};

export const fetchDelete = async (route, body, signal, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "DELETE",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors",
    signal,
  });
};
