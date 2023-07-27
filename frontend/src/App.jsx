import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homescreen from "./pages/Homescreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import ProtectedComp from "./components/ProtectedComp";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homescreen />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="" element={<ProtectedComp />}>
            <Route path="profile" element={<Update />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
