import api from "./api";

export const putDataBook = async (options) => {
  const { cookies, formData, uuid } = options;
  try {
    const response = await api.put(`/book/update/${uuid}`, formData, {
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
