import api from "./api";

export const fetchDataBooks = async (options) => {
  const { cookies, per_page, page } = options;
  try {
    const response = await api.get("/books", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
      params: {
        per_page,
        // page,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataDetailBook = async (options) => {
  const { cookies, selectedBook } = options;
  try {
    const response = await api.get(`/books/${selectedBook}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataUsers = async (options) => {
  const { cookies, per_page, page } = options;
  try {
    const response = await api.get("/users", {
      headers: { Authorization: `Bearer ${cookies.token}` },
      params: {
        per_page,
        page,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataCategories = async (options) => {
  const { cookies } = options;
  try {
    const response = await api.get("/categories", {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataLoans = async (options) => {
  const { cookies, per_page, page } = options;
  try {
    const response = await api.get("/loans", {
      headers: { Authorization: `Bearer ${cookies.token}` },
      params: {
        per_page,
        page,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};
