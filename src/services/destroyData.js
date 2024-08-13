import api from "./api";

export const destroyDataBook = async (options) => {
  const { cookies, book_uuid } = options;
  console.log(book_uuid);
  console.log(cookies.token);
  try {
    const response = await api.delete(`/book/delete/${book_uuid}`, {
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

export const destroyDataUser = async (options) => {
  const { cookies, user_id } = options
  console.log(cookies.token);
  try {
    const response = await api.delete(`/user/delete/${user_id}`, {
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

export const destroyDataCategory = async (options) => {
  const { cookies, category_uuid } = options;
  console.log(cookies.token);
  try {
    const response = await api.delete(`/category/delete/${category_uuid}`, {
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
