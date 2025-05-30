const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40",
  headers: {
    method: "GET",
    authorization: "d63676c5-17e7-426b-8f3c-c5bb2f47b925",
    "Content-Type": "application/json"
  }
};

const loadProfileData = () => {
  return fetch(`${apiConfig.baseUrl}/users/mes`, {
    headers: {
      method: apiConfig.method,
      authorization: apiConfig.headers.authorization,
    }
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
    headers: {
      method: apiConfig.method,
      authorization: apiConfig.headers.authorization,
    }
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

export { loadProfileData, loadCards }



