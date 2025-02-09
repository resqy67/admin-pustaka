import api from "./api";

export const putDataBook = async (options) => {
  const { cookies, formData, book_uuid } = options;
  try {
    const response = await api.put(`/book/update/${book_uuid}`, formData, {
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
