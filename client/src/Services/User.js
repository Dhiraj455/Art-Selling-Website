const axios = require("axios").default;

export const register = async (form) => {
  return await axios({
    method: "post",
    url: "/register",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const login = async (form) => {
  return await axios({
    method: "post",
    url: "/login",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const googleLogin = (googleData) => {
  return axios({
    method: "POST",
    url: "/googleLogin",
    data: { token: googleData.tokenId },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const refreshRoute = () => {
  return axios({
    method: "post",
    url: "/refreshToken",
  });
};

export const update = async (form) => {
  return await axios({
    method: "post",
    url: "/update",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getProfile = async (id) => {
  return await axios({
    method: "get",
    url: `/profile/${id}`,
    // data: form,
    // headers: { "Content-Type": "application/json" },
  });
};

export const post = async (form) => {
  return await axios({
    method: "post",
    url: "/postArt",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getPost = async () => {
  return await axios({
    method: "get",
    url: "/getPosts",
  });
};

export const getSomePosts = async () => {
  return await axios({
    method: "get",
    url: "/getSomePosts",
  });
};

export const deletePost = async (form) => {
  return await axios({
    method: "delete",
    url: "/deletePost",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const getAPost = async (id) => {
  return await axios({
    method: "get",
    url: `/getAPost/${id}`,
  });
};

export const updatePost = async (form) => {
  return await axios({
    method: "put",
    url: "/updatePost",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMyPosts = async () => {
  return await axios({
    method: "get",
    url: "/getMyPosts",
  });
};

export const getBoughtItems = async () => {
  return await axios({
    method: "get",
    url: "/getBoughtItems",
  });
};

export const getUsersPosts = async (id) => {
  return await axios({
    method: "get",
    url: `/getUsersPosts/${id}`,
  });
};

export const addWallet = async (form) => {
  return await axios({
    method: "post",
    url: "/addWallet",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};
