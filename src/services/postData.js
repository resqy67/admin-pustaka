import api from "./api";

export const postLogin = async (options) => {
  try {
    const response = await api.post("/login", options);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postDataBooks = async (options) => {
  const { cookies, formData } = options;
  try {
    const response = await api.post("/book/store", formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postDataUsers = async (options) => {
  const { cookies, formData } = options;
  console.log(formData);
  console.log(cookies.token);
  try {
    const response = await api.post("/register", formData, {
      // headers: {
      //   Authorization: `Bearer ${cookies.token}`,
      // },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
