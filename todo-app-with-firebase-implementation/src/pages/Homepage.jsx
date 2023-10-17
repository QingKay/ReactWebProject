import { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  collection,
  db,
  onSnapshot,
  query,
  where,
  orderBy,
} from "../firebase/index";

// Importing contexts
import { UserContext } from "../contexts/User";

// Importing components
import Todo from "../components/Todo";
import Header from "../components/Header";

const Homepage = () => {
  const { user } = useContext(UserContext);

  // States
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([]);

  // Reference to todos collection
  const colRef = collection(db, "todos");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (mounted) {
      if (Object.keys(user).length > 0) {
        const q = query(
          colRef,
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        onSnapshot(q, (snapshot) => {
          let arr = [];
          snapshot.docs.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id });
          });
          setTodos(arr);
          setLoading(false);
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  const override = {
    borderColor: "white",
    margin: "0",
    padding: "0",
  };

  const ViewTodo = () => {
    if (loading) {
      return (
        <div className="flex justify-center">
          <ClipLoader size={60} loading={true} cssOverride={override} />
        </div>
      );
    }

    if (todos.length === 0)
      return (
        <h3 className="text-xl font-semibold text-white text-center">
          No plan found
        </h3>
      );
    else
      return todos.map((todo) => (
        <Todo key={todo.id} data={todo} status="inProcess" />
      ));
  };

  return (
    <main className="">
      <Header todos={todos} />
      <ViewTodo />
    </main>
  );
};

export default Homepage;
