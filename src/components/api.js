const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    method: "GET",
    authorization: "d63676c5-17e7-426b-8f3c-c5bb2f47b925",
    "Content-Type": "application/json"
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

const loadProfileData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then((res => checkResponse(res)));
};

const loadCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then((res => checkResponse(res)));
};

const editProfile = (profileName, profileDescription) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    })
  })
    .then((res => checkResponse(res)));
};

const editAvatar = (link) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      avatar: link
    })
  })
    .then((res => checkResponse(res)));
};

const addNewCard = (cardName, cardLink) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then((res => checkResponse(res)));
};

const deleteCardFromServer = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": "application/json"
    }
  })
    .then((res => checkResponse(res)));
};

const toggleLikeOnServer = (cardId, method) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: `${method}`,
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": "application/json"
    }
  })
    .then((res => checkResponse(res)));
};

export {
  loadProfileData,
  loadCards,
  editProfile,
  addNewCard,
  deleteCardFromServer,
  toggleLikeOnServer,
  editAvatar
};



