import { useState } from "react";
import { updateDoc } from "../../firebase/index";
import { nanoid } from "nanoid";
import { ClipLoader } from "react-spinners";

// Importing components
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";

// Importing icons
import { FaPlus } from "react-icons/fa";

// Importing functions for notifications
import {
  successNotification,
  errorNotification,
} from "../../functions/Notifications";

const AddTodo = ({ addTodoModal, setAddTodoModal, docRef, todos }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = (e) => {
    e.preventDefault();

    setLoading(true);

    updateDoc(docRef, {
      todos: [
        ...todos,
        {
          id: nanoid(),
          priority,
          task,
          done: false,
        },
      ],
    })
      .then(() => {
        successNotification("Todo added");
        setTask("");
        setPriority("");
        setAddTodoModal(false);
        setLoading(false);
      })
      .catch((err) => {
        errorNotification("Error in adding todo");
        console.log(err);
        setLoading(false);
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
        !addTodoModal && "hidden"
      }`}
    >
      <div
        className="h-screen w-full absolute z-10 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setAddTodoModal(false)}
      ></div>
      <div
        className="bg-white shadow-lg w-5/6 md:w-3/5 lg:w-2/5 p-3"
        style={{ zIndex: 1000 }}
      >
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">Add a task</h3>
        </div>

        <div className="mt-4">
          <form onSubmit={(e) => addTodo(e)}>
            <TextInput name="Task" input={task} setInput={setTask} />

            <SelectInput
              name="Priority"
              input={priority}
              setInput={setPriority}
            />

            <button
              type="submit"
              className="mt-2 text-md bg-green-400 py-2 rounded-sm pl-4 pr-1 text-white hover:shadow hover:bg-green-500 transition ease-in duration-300 rounded"
              disabled={loading}
            >
              {!loading ? (
                <>
                  Add{" "}
                  <span className="ml-2">
                    <FaPlus className="icon text-sm" />
                  </span>
                </>
              ) : (
                <ClipLoader
                  size={20}
                  loading={loading}
                  cssOverride={override}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
