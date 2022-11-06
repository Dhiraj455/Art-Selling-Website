// import { useNavigate } from "react-router-dom";

async function Autho() {
  // const navigate = useNavigate();
  try {
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
      console.log("Error");
      // navigate("/login");
      window.location.href = "/login";
      // const error = new Error(data.message);
      // throw error;
    }
    return data;
  } catch (err) {
    // navigate("/login");
    console.log(err);
  }
}

export default Autho;
