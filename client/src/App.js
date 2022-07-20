import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Login,
  Register,
  Home,
  AddEditPost,
  SinglePost,
  Dashboard,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addPost" element={<AddEditPost />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
