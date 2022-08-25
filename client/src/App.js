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
  PrivateRoute,
  NotFound,
  Tags,
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
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/tags/:tag" element={<Tags />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addPost"
            element={
              <PrivateRoute>
                <AddEditPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/editPost/:id"
            element={
              <PrivateRoute>
                <AddEditPost />
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
