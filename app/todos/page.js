"use client";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function TodosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data.todos);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please sign in to view your todos");
      } else {
        toast.error("Failed to fetch todos");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api/todos', { params: { id } });
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please sign in to delete todos");
      } else {
        toast.error("Failed to delete todo");
      }
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put('/api/todos', {}, { params: { id } });
      toast.success(response.data.message);
      fetchTodos();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please sign in to update todos");
      } else {
        toast.error("Failed to update todo");
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchTodos();
    }
  }, [status, router]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!title || !description) {
        toast.error("Please fill all fields");
        return;
      }
      const response = await axios.post("/api/todos", { title, description });
      toast.success(response.data.message);
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please sign in to create todos");
      } else {
        toast.error("Failed to create todo");
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Please sign in to access your todos</h1>
        <button
          onClick={() => signIn("github")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
        >
          Sign In with GitHub
        </button>
        <ToastContainer theme="dark" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="flex justify-between items-center w-[80%] max-w-[600px] mt-8 px-2 mx-auto">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
      </div>

      <form
        onSubmit={submitForm}
        className="flex flex-col gap-2 items-start w-[80%] max-w-[600px] mt-8 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="px-3 py-2 border w-full rounded-md"
        />
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="px-3 py-2 border w-full rounded-md"
        ></textarea>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-8 w-[85%] lg:w-[60%] mx-auto mb-8">
        {todos.length === 0 ? (
          <div className="text-center py-4">No todos found. Create one to get started!</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right border rounded-lg overflow-hidden">
            <thead className="text-xs uppercase text-white border-b bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">Id</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <Todo
                  key={todo._id}
                  id={todo._id}
                  index={index}
                  title={todo.title}
                  description={todo.description}
                  status={todo.isCompleted}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
