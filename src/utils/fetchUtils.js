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

export const fetchPost = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};

export const fetchPut = async (route, signal) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "PUT",
    mode: "cors",
    signal,
  });
};

export const fetchDelete = async (route, signal) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "DELETE",
    mode: "cors",
    signal,
  });
};
