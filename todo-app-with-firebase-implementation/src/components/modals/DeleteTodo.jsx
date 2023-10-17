import { useState } from "react";
import { deleteDoc } from "../../firebase/index";
import { ClipLoader } from "react-spinners";

// Importing functions for notifications
import {
  successNotification,
  errorNotification,
} from "../../functions/Notifications";

const DeleteTodo = ({ deleteTodoModal, setDeleteTodoModal, docRef }) => {
  const [loading, setLoading] = useState(false);

  const deleteTodo = () => {
    setLoading(true);

    deleteDoc(docRef)
      .then(() => {
        successNotification("Plan deleted successfully");
        setDeleteTodoModal(false);
        setLoading(false);
      })
      .catch((err) => {
        errorNotification("Error in deleting plan");
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
        !deleteTodoModal && "hidden"
      }`}
    >
      <div
        className="h-screen w-full absolute z-10 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setDeleteTodoModal(false)}
      ></div>
      <div
        className="bg-white shadow-lg w-5/6 md:w-3/5 lg:w-2/5 p-3"
        style={{ zIndex: 1000 }}
      >
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">
            Are you sure you want to delete it
          </h3>
        </div>

        <div className="mt-4 flex justify-center">
          <div>
            <button
              type="button"
              className="mt-2 text-md bg-red-400 py-2 rounded-sm px-4 mr-3 text-white hover:shadow hover:bg-red-500 transition ease-in duration-300 rounded"
              disabled={loading}
              onClick={() => deleteTodo()}
            >
              {!loading ? (
                <>Yes</>
              ) : (
                <ClipLoader
                  size={20}
                  loading={loading}
                  cssOverride={override}
                />
              )}
            </button>
            <button
              type="button"
              className="mt-2 text-md bg-green-400 py-2 rounded-sm px-4 text-white hover:shadow hover:bg-green-500 transition ease-in duration-300 rounded"
              onClick={() => setDeleteTodoModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
