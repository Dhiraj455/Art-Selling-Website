const axios = require("axios").default;

export const getAllUser = async () => {
  return await axios({
    method: "get",
    url: `/users`,
  });
};

export const getSomeUser = async () => {
  return await axios({
    method: "get",
    url: `/someUsers`,
  });
};

export const suspend = async (form) => {
  return await axios({
    method: "post",
    url: "/suspend",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};
