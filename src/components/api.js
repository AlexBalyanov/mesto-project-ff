const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    method: "GET",
    authorization: "d63676c5-17e7-426b-8f3c-c5bb2f47b925",
    "Content-Type": "application/json"
  },
};

const loadProfileData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
    .catch((err) => {
      console.log(err);
    })
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { loadProfileData, loadCards, editProfile, addNewCard }



