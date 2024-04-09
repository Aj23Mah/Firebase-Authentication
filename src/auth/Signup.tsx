import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Basic form validation
    if (!email.trim()) {
      toast.error("Invalid Form, Email Address can not be empty");
      return;
    }


    // Password validation

    // if (!password.trim()) {
    //   toast.error("Invalid Form, Password can not be empty");
    //   return;
    // }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least one uppercase character.");
      return;
    }

    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must contain at least one lowercase character.");
      return;
    }

    if (!/(?=.*\d)/.test(password)) {
      toast.error("Password must contain at least one digit.");
      return;
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;

      // Get the Firebase Authentication ID token
      const idToken = await user.getIdToken();

      // Store the ID token in localStorage or wherever you need it
      localStorage.setItem("token", idToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");

      toast.success("New account is created");
    } catch (error) {
      // console.log(error);
      toast.error("New account COuld not be created");
    }
  };

  // const handleEmailChange = (e: any) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: any) => {
  //   setPassword(e.target.value);
  // };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="md:w-[460px] w-full border border-solid border-black md:p-10 p-5">
        <div className="md:text-4xl text-2xl font-semibold mb-4 text-center">
          Sign Up
        </div>

        <div>
          <form onSubmit={onSubmit}>
            <div className="mb-4 border-2 border-solid border-black">
              <input
                type="text"
                id="email"
                placeholder="email"
                className="outline-none md:py-3 py-1 md:px-4 px-2 w-full text-lg"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                // onChange={handleEmailChange}
              />
            </div>
            <div className="relative mb-4 border-2 border-solid border-black">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                className="outline-none md:py-3 py-1 md:px-4 px-2 w-full text-lg"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                // onChange={handlePasswordChange}
              />

              {/* show password */}
              <div>
                  {showPassword ? (
                  <AiFillEyeInvisible
                    className="absolute right-3 top-3 text-2xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                ) : (
                  <AiFillEye
                    className="absolute right-3 top-3 text-2xl cursor-pointer"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                )}
              </div>

            </div>
            <div className="mb-4 flex justify-between md:text-base text-xs">
              <p>
                Don't have a account?{" "}
                <Link
                  to="/login"
                  className="text-red-600 hover:text-red-700 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forget-password"
                  className="text-blue-600 hover:text-blue-700 ease-in-out"
                >
                  Forget Password
                </Link>
              </p>
            </div>
            <div className="mb-4">
              <button
                className="md:py-3 py-1 md:font-semibold font-medium border-none bg-blue-600 hover:bg-blue-700 text-white text-lg uppercase w-full transition duration-150 ease-in-out"
                type="submit"
              >
                Sign Up
              </button>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
