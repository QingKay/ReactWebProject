import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
} from "../firebase/index";

// Importing components
import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import FileInput from "../components/inputs/FileInput";

// Importing functions for notifications
import {
  successNotification,
  errorNotification,
} from "../functions/Notifications";

const Signup = () => {
  const auth = getAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const storage = getStorage();
  const profilePic = ref(storage, username);

  const signup = (e) => {
    e.preventDefault();

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        uploadBytes(profilePic, image)
          .then(() => {
            getDownloadURL(profilePic)
              .then((url) => {
                updateProfile(auth.currentUser, {
                  displayName: username,
                  photoURL: url,
                })
                  .then(() => {
                    successNotification("User signed up. Redirecting...");
                    setLoading(false);
                    navigate("/login");
                  })
                  .catch(() => {
                    errorNotification(
                      "Error occurred while signing you up. Please try again"
                    );
                    setLoading(false);
                  });
              })
              .catch(() => {
                errorNotification(
                  "Error occurred while signing you up. Please try again"
                );
                setLoading(false);
              });
          })
          .catch(() => {
            errorNotification(
              "Error occurred while signing you up. Please try again"
            );
            setLoading(false);
          });
      })
      .catch(() => {
        errorNotification(
          "Error occurred while signing you up. Please try again"
        );
        setLoading(false);
      });
  };

  const override = {
    borderColor: "white",
  };

  return (
    <main className="flex items-center justify-center  bg-cyan-500 h-screen">
      <div className="inline shadow bg-white rounded px-6 py-10 w-5/6 md:w-3/4 lg:w-1/3">
        <h1 className="uppercase text-green-500 text-2xl font-bold text-center mb-2">
          FunnnTodo
        </h1>
        <h3 className="uppercase text-green-500 text-xl font-bold text-center mb-10">
          Sign Up
        </h3>
        <form onSubmit={(e) => signup(e)}>
          <TextInput input={username} setInput={setUsername} name="username" />
          <TextInput input={email} setInput={setEmail} name="email" />
          <FileInput input={image} setInput={setImage} name="image" />
          <PasswordInput
            input={password}
            setInput={setPassword}
            name="password"
          />

          <button
            className="text-md rounded bg-cyan-500 py-2 px-6 text-white hover:shadow hover:bg-orange-500 transitionItem flex items-center"
            type="submit"
            disabled={loading}
          >
            Sign up{" "}
            <ClipLoader
              size={20}
              loading={loading}
              className="mt-1 ml-2"
              cssOverride={override}
            />
          </button>
        </form>
        <p className="mt-2">
          <span className="text-gray-400 text-sm">
            Already have an account?
          </span>{" "}
          <Link to="/login" className="text-sm text-cyan-500">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
