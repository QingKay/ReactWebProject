import React, { lazy, Suspense, useState, useEffect } from "react";
import moment from "moment";
import { doc, db } from "../firebase/index";

// Importing icons
import { ImBin } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

// Importing components
import EachTodo from "./EachTodo";

// Importing notifications
import { errorNotification } from "../functions/Notifications";

const AddTodo = lazy(() => import("./modals/AddTodo"));
const DeleteTodo = lazy(() => import("./modals/DeleteTodo"));

const Todo = ({ data }) => {
  const [status, setStatus] = useState("inProcess");

  const [addTodoModal, setAddTodoModal] = useState(false);
  const [deleteTodoModal, setDeleteTodoModal] = useState(false);
  const [performance, setPerformance] = useState(0);

  const date = new Date(data.date);

  // Reference on document
  const docRef = doc(db, "todos", data.id);

  useEffect(() => {
    let mounted = true;  
    if(mounted === true) {
      let result = 0;
      let highest = 0;
      data.todos.forEach((todo) => {
        let score;
        if (todo.priority === "A") {
          score = 5;
        } else if (todo.priority === "B") {
          score = 3;
        } else {
          score = 1;
        }

        result += todo.done === true ? score : 0;
        highest += score;
      });
      const currentDate = Date.parse(moment().startOf("day")._d);
      
      if (data.date >= currentDate) {
        setStatus("inProcess");
        return;
      }
      const finalResult = (result / highest) * 100;
      setPerformance(Math.floor(finalResult));
      if (finalResult >= 80) {
        setStatus("excellent");
      } else if (finalResult >= 50) {
        setStatus("good");
      } else {
        setStatus("bad");
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const addTask = () => {
    const currentDate = Date.parse(moment().startOf("day")._d);
    if (currentDate > data.date) {
      errorNotification("Move on... You have past this date already");
      return;
    }

    setAddTodoModal(true);
  }

  const Report = () => {
    if (status === "excellent") {
      return "Your day was productive. Well done!";
    } else if (status === "good") {
      return "Not half bad. You can do better though.";
    } else if (status === "bad") {
      return "Lazy bone. Were you sleeping all day Sleeping Beauty?";
    } else {
      return "";
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className={`w-5/6 md:w-2/3 lg:w-1/3 lg:1/3 my-4 rounded drop-shadow px-4 py-8 bg-green-400 ${
          status === "excellent" && "bg-green-400"
        } ${status === "good" && "bg-orange-400"} ${
          status === "bad" && "bg-red-400"
        } ${status === "inProcess" && "bg-white"} text-white`}
      >
        <div className="flex justify-between mb-2">
          <h3
            className={`font-bold text-xl text-sm md:text-base mb-2 ${
              status === "inProcess" && "text-gray-600"
            }`}
          >
            {date.toDateString()}
          </h3>
          <button
            className={`py-2 pl-3 ${
              status === "inProcess" && "bg-gray-500 hover:bg-gray-600"
            } ${status === "excellent" && "bg-green-600 hover:bg-green-700"} ${
              status === "good" && "bg-orange-600 hover:bg-orange-700"
            } ${
              status === "bad" && "bg-red-500 hover:bg-red-600"
            } transitionItem rounded text-white text-sm`}
            onClick={() => addTask()}
          >
            Add a new task
            <span>
              <FaPlus className="icon ml-2" />
            </span>
          </button>
        </div>
        <ul>
          {data.todos && data?.todos.length !== 0 ? (
            data?.todos.map((eachTodo) => (
              <EachTodo
                key={eachTodo.id}
                todo={eachTodo}
                status={status}
                todos={data.todos}
                docRef={docRef}
                date={data.date}
              />
            ))
          ) : (
            <h3 className="text-xl font-semibold text-gray-500 mt-3">
              No todo found
            </h3>
          )}
        </ul>
        <div className="flex gap-5 items-center justify-between mt-6">
          <div>
            <p
              className={`${status === "inProcess" && "text-gray-500 hidden"}`}
            >
              <Report /> {`Your performance was ${performance}%`}
            </p>
          </div>
          <button
            className="py-2 pl-3 bg-red-500 hover:bg-red-600 transitionItem rounded text-white"
            onClick={() => setDeleteTodoModal(true)}
          >
            <span>
              <ImBin className="icon" />
            </span>
          </button>
        </div>
      </div>
      {/* Adding Modal */}
      <Suspense>
        <AddTodo
          addTodoModal={addTodoModal}
          setAddTodoModal={() => setAddTodoModal()}
          docRef={docRef}
          todos={data.todos}
        />
        <DeleteTodo
          deleteTodoModal={deleteTodoModal}
          setDeleteTodoModal={() => setDeleteTodoModal()}
          docRef={docRef}
        />
      </Suspense>
    </div>
  );
};

export default React.memo(Todo);
