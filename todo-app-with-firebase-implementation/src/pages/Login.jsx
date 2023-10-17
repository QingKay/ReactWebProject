import { useState, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";

// Importing firebase functions
import { signInWithEmailAndPassword, getAuth } from "../firebase/index";

// Importing context
import { UserContext } from "../contexts/User";

// Importing functions for notifications
import { errorNotification } from "../functions/Notifications";

// Importing components
import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";

// Importing icons
import { BiLogIn } from "react-icons/bi";

const Login = () => {
  const { user, loadingUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      user && navigate("/");
    };

    return () => {
      checkUser();
    };
  }, [user, loadingUser]);

  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const logIn = (e) => {
    e.preventDefault();

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
        errorNotification("Error in loggin in. Please check your credentials");
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
          Login
        </h3>
        <form onSubmit={(e) => logIn(e)}>
          <TextInput input={email} setInput={setEmail} name="email" />
          <PasswordInput
            input={password}
            setInput={setPassword}
            name="password"
          />
          <button
            className="text-md rounded bg-cyan-500 py-2 pl-6 pr-4 text-white hover:shadow hover:bg-orange-500 transitionItem flex items-center"
            type="submit"
            disabled={loading}
          >
            Login
            {loading ? (
              <ClipLoader
                size={20}
                loading={loading}
                className="mt-1 ml-2"
                cssOverride={override}
              />
            ) : (
              <BiLogIn className="icon ml-2 mt-2" />
            )}
          </button>
        </form>
        <p className="mt-2">
          <span className="text-gray-400 text-sm">Don't have an account?</span>{" "}
          <Link to="/signup" className="text-sm text-cyan-500">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
