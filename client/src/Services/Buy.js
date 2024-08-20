// const axios = require("axios").default;
import axios from "axios";
// const url = "https://art-selling-website.onrender.com"
const url = "http://localhost:8000";

export const addtocart = async (form) => {
  return await axios({
    method: "post",
    url: `${url}/addtocart`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const mycart = async (id) => {
  return await axios({
    method: "get",
    url: `${url}/mycart/${id}`,
  });
};

export const updateCart = async (form) => {
  return await axios({
    method: "post",
    url: `${url}/updateCart`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteItem = async (form) => {
  console.log(form);
  return await axios({
    method: "delete",
    url: `${url}/deleteItem`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const buyCart = async (form) => {
  console.log(form);
  return await axios({
    method: "post",
    url: `${url}/buyCart`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const getTrack = async () => {
  return await axios({
    method: "get",
    url: `${url}/getTrack`,
  });
};

export const getAcceptedTrack = async () => {
  return await axios({
    method: "get",
    url: `${url}/getAcceptedTrack`,
  });
};

export const getDeliveredTrack = async () => {
  return await axios({
    method: "get",
    url: `${url}/getDeliveredTrack`,
  });
};

export const isDelivered = async (form) => {
  return await axios({
    method: "post",
    url: `${url}/isDelivered`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const isNotDelivered = async (form) => {
  return await axios({
    method: "post",
    url: `${url}/isNotDelivered`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};

export const isAccepted = async (form) => {
  return await axios({
    method: "post",
    url: `${url}/isAccepted`,
    data: form,
    headers: { "Content-Type": "application/json" },
  });
};
