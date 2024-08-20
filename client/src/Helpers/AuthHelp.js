
// const url = "https://art-selling-website.onrender.com";
const url = "http://localhost:8000";
async function Autho() {
  try {
    const response = await fetch(`${url}/auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data.message === "Unauthorized") {
      console.log("Error");
      const error = new Error(data.message);
      throw error;
    }
    return data;
  } catch (err) {
    window.location.href = "/login";
    console.log(err);
  }
}

export default Autho;