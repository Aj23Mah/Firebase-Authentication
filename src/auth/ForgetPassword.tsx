import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
// import OAuth from "./OAuth";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  // function onChange(e: any) {
  //   setEmail(e.target.value);
  // }
  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Basic form validation
    if (!email.trim()) {
      toast.error("Invalid Form, Email Address can not be empty");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      // console.log("Email was sent");
      toast.success("Email was sent");
    } catch (error) {
      // console.log("COuld not send reset password");
      toast.error("COuld not send reset password");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="md:w-[460px] w-full border border-solid border-black md:p-10 p-5">
        <div className="md:text-4xl text-2xl font-semibold mb-4 text-center">
          Forget Password
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 flex justify-between md:text-base text-xs">
              <p>
                Don't have a account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <div className="mb-4">
              <button
                className="md:py-3 py-1 md:font-semibold font-medium border-none bg-blue-600 hover:bg-blue-700 text-white text-lg uppercase w-full transition duration-150 ease-in-out"
                type="submit"
              >
                Forget Password
              </button>
            </div>

            {/* <OAuth /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
