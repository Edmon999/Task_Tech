import axios from "axios";

export const getUserData = async (page: number) => {
  const response = await axios.get(
    `https://random-data-api.com/api/v2/users?size=10&page=${page}`
  );
  return response.data;
};
