import React from "react";

const Todo = ({index, id, title, description, status,deleteTodo,completeTodo }) => {
  return (
    <>
      <tr className="border-b">
        <th scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-white">
          {index+1}
        </th>
        <td className={`px-6 py-4 ${status ? "line-through" : ""}`}>{title}</td>
        <td className={`px-6 py-4 ${status ? "line-through" : ""}`}>{description}</td>
        <td className={`px-6 py-4 ${status ? "text-green-500" : "text-red-500"}`}>{status ? "completed" : "pending"}</td>
        <td className="px-6 py-4 flex gap-2">
          <button className={`${status ? "bg-green-500" :"bg-blue-500"} text-white px-3 py-1 rounded`} onClick={()=>completeTodo(id)} disabled={status}>
            Done
          </button>
          <button className="bg-red-700 text-white px-3 py-1 rounded" onClick={()=>deleteTodo(id)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Todo;
