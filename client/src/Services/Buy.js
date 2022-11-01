const axios = require("axios").default;

export const addtocart = async (form) => {
  return await axios({
    method: "post",
    url: "/addtocart",
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const mycart = async (id) => {
  return await axios({
    method: "get",
    url: `/mycart/${id}`,
  });
};

export const updateCart = async (form) => {
  return await axios({
    method: "post",
    url: `/updateCart`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteItem = async (form) => {
  console.log(form);
  return await axios({
    method: "delete",
    url: `/deleteItem`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const buyCart = async (form) => {
  console.log(form);
  return await axios({
    method: "post",
    url: `/buyCart`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const getTrack = async () => {
  return await axios({
    method: "get",
    url: `/getTrack`,
  });
};

export const getAcceptedTrack = async () => {
  return await axios({
    method: "get",
    url: `/getAcceptedTrack`,
  });
};

export const getDeliveredTrack = async () => {
  return await axios({
    method: "get",
    url: `/getDeliveredTrack`,
  });
};

export const isDelivered = async (form) => {
  return await axios({
    method: "post",
    url: `/isDelivered`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const isAccepted = async (form) => {
  return await axios({
    method: "post",
    url: `/isAccepted`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};
