import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logout Sucessful");
    } catch (error: any) {
      // console.error("Error logging out:", error.message);
      toast.error("Error logging out");
    }
  };

  // Redirect unauthenticated users to the login page
  if (!user) {
    navigate("/login");
    return null; // or render a loading spinner or message
  }

  return (
    <div className="grid place-content-center h-screen">
      <div className="text-4xl font-semibold mb-2">Welcome to the React Firebase Authentication</div>
      <div className="texxt-2xl font-semibold mb-2">{user && user.email}</div>
      <button className="py-2 px-4 text-xl font-semibold uppercase text-white bg-red-600 hover:bg-red-700" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
