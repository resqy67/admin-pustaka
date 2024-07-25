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
