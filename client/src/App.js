import "./App.css";
import Layout from "./Components/Layout/Layout";
// import "boxicons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
