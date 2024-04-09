import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Singup from "./auth/Signup";
import Sigin from "./auth/Signin";
import ForgetPassword from "./auth/ForgetPassword";
import Home from "./pages/Home";
import Error from "./hooks/Error";
import Protected from "./hooks/Protected";
// import PrivateRoute from "./hooks/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Sigin />} />
        <Route path="/sign-up" element={<Singup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<Protected />}>
          <Route path="/" index element={<Home />} />
        </Route>
        {/* <PrivateRoute path="/">
        <Route path="/" element={<Home />} />
      </PrivateRoute> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </>
  );
};

export default App;
