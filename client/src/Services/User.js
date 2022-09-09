const axios = require("axios").default;

export const register = async (form) => {
    return await axios({
        method: "post",
        url: "/register",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const update = async (form) => {
    return await axios({
        method: "post",
        url: "/update",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
    })
};
