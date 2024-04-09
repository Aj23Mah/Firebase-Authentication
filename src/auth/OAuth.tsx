// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   // signInWithRedirect,
//   // signOut,
//   // onAuthStateChanged,
// } from "firebase/auth";
// // import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// // import { auth } from "../firebase/firebase.config";

// const OAuth = () => {
//   const onGoogleClick = async () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;
//         console.log(token);
//         if (!credential) {
//           console.error("No credential received from authentication process");
//           // Handle this scenario, such as displaying an error message to the user
//         } else {
//           const token = credential.accessToken;
//           console.log(token);
//         }
//         // The signed-in user info.
//         const user = result.user;
//         console.log(user);
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         console.error("Error signing in with Google:", error.message);

//         // Handle Errors here.
//         // const errorCode = error.code;
//         // const errorMessage = error.message;
//         // // The email of the user's account used.
//         // const email = error.customData.email;
//         // // The AuthCredential type that was used.
//         // const credential = GoogleAuthProvider.credentialFromError(error);
//       });
//   };
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={onGoogleClick}
//         className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-lg font-semibold hover:bg-red-700 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
//       >
//         <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// export default OAuth;

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase/firebase.config";
import { useNavigate } from "react-router";
import { useState } from "react";

const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      setLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error: any) {
      console.error("Could not authorize with Google:", error.message);
      // Display error message to the user
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      disabled={loading}
      className={`flex items-center justify-center w-full bg-red-600 text-white md:py-3 py-2 md:font-semibold font-medium border-none uppercase md:text-lg text-base hover:bg-red-700 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <FcGoogle className="md:text-2xl text-xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
};

export default OAuth;
