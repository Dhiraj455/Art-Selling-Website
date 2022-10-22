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
    console.log(id);
    return await axios({
      method: "get",
      url: `/mycart/${id}`,
    });
  }; 