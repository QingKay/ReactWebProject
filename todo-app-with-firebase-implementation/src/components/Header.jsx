import { lazy, Suspense, useContext, useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  initializeApp,
  firebaseConfig,
  getAuth,
  signOut,
} from "../firebase/index";

// Importing components
const CreateTodo = lazy(() => import("./modals/CreateTodo"));

import { UserContext } from "../contexts/User";

import { errorNotification } from "../functions/Notifications";

const Header = ({ todos }) => {
  initializeApp(firebaseConfig);

  const navigate = useNavigate();

  const auth = getAuth();

  const { user } = useContext(UserContext);

  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [date, setDate] = useState(null);
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);

  const checkToday = () => {
    const currentDate = Date.parse(moment().startOf("day")._d);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].date === currentDate) {
        setToday(true);
        break;
      } else {
        setToday(false);
      }
    }
  };

  const checkTomorrow = () => {
    const tomorrowDate = Date.parse(moment().startOf("day").add(1, "days")._d);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].date === tomorrowDate) {
        setTomorrow(true);
        break;
      } else {
        setTomorrow(false);
      }
    }
  };

  const checkDate = () => {
    if (todos.length === 0) {
      setToday(false);
      setTomorrow(false);
      return;
    }
    checkToday();
    checkTomorrow();
  };

  useEffect(() => {
    checkDate();
  }, [todos]);

  const signout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => {
        console.log(err);
        errorNotification("Error in signing out");
      });
  };

  const planForToday = () => {
    setDate(Date.parse(moment().startOf("day")._d));
    setCreateTodoModal(true);
  };

  const planForTomorrow = () => {
    setDate(Date.parse(moment().startOf("day").add(1, "days")._d));
    setCreateTodoModal(true);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="pt-8 w-4/5 lg:w-1/2">
        <div className="flex justify-center mb-2">
          <img
            src={user.photoURL}
            className="h-24 w-24 object-cover rounded-full"
            alt="user"
          />
        </div>
        <h1 className="text-xl lg:text-2xl font-black tracking-wide text-center text-white uppercase">
          Welcome, {user.displayName}
        </h1>

        <p className="text-center text-white mt-2">
          {!today && (
            <>
              So you have no plan for your life today.{" "}
              <span className="font-bold">CREATE ONE!!!</span>
              <button
                className="col-span-2 py-1 px-4 ml-4 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm"
                onClick={() => planForToday()}
              >
                Create
              </button>
            </>
          )}

          <button
            className="col-span-2 py-1 px-4 ml-2 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm"
            onClick={() => signout()}
          >
            Log out
          </button>
        </p>

        {!tomorrow && (
          <p className="text-center text-white mt-2">
            You want to plan for tomorrow instead?
            <button
              className="col-span-2 py-1 px-4 ml-4 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm"
              onClick={() => planForTomorrow()}
            >
              Plan for tomorrow
            </button>
          </p>
        )}
      </div>
      {/* Adding Modal */}
      <Suspense>
        <CreateTodo
          createTodoModal={createTodoModal}
          setCreateTodoModal={() => setCreateTodoModal()}
          date={date}
        />
      </Suspense>
    </div>
  );
};

export default Header;
