
async function Autho(){
  try {;
    const response = await fetch("/auth", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Unauthorized") {
      const error = new Error(data.message);
      throw error;
    }
    return data;
  } catch (err) {
    window.location.href = "/login";
    console.log(err);
  }
};

export default Autho;
