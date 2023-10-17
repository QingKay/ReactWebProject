import { useContext, useState } from "react";
import {
  addDoc,
  collection,
  db,
  initializeApp,
  firebaseConfig,
} from "../../firebase/index";
import { ClipLoader } from "react-spinners";

// Importing contexts
import { UserContext } from "../../contexts/User";

// Importing functions for notifications
import {
  successNotification,
  errorNotification,
} from "../../functions/Notifications";
// toast.configure();
const CreateTodo = ({ date, createTodoModal, setCreateTodoModal }) => {
  initializeApp(firebaseConfig);
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const colRef = collection(db, "todos");

  const dateObj = new Date(date);

  const create = () => {
    setLoading(true);
    addDoc(colRef, {
      date,
      userId: user.uid,
      todos: [],
    })
      .then(() => {
        successNotification("Plan created successfully");
        setLoading(false);
        setCreateTodoModal(false);
      })
      .catch((err) => {
        errorNotification("Error in creating plan");
        console.log(err);
        setLoading(false);
        setCreateTodoModal(false);
      });
  };

  const override = {
    borderColor: "white",
    margin: "0",
    padding: "0",
  };

  return (
    <div
      className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center z-20 ${
        !createTodoModal && "hidden"
      }`}
    >
      <div
        className="h-screen w-full absolute z-10 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setCreateTodoModal(false)}
      ></div>
      <div
        className="bg-white shadow-lg w-5/6 md:w-3/5 lg:w-2/5 p-3"
        style={{ zIndex: 1000 }}
      >
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">Let's make a plan</h3>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-center">
            You are about to make a smart move by creating a plan for{" "}
            {dateObj.toDateString()}
          </p>
          <div className="flex justify-end mt-2">
            <button
              className="col-span-2 py-1 px-4 ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold transitionItem rounded-sm"
              onClick={() => create()}
              disabled={loading}
            >
              {!loading ? (
                "Let's do this"
              ) : (
                <ClipLoader
                  size={20}
                  loading={loading}
                  cssOverride={override}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
