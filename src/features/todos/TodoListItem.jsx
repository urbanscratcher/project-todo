import { useState } from "react";

const TodoListItem = ({ id, updateTodos, idx, doneInit, todo }) => {
  const [done, setDone] = useState(todo.done);

  const deleteHandler = (e) => {
    setDone((done) => !done);

    updateTodos((todos) =>
      todos.map((todo, i) => {
        if (i === idx) {
          todo.done = !done;
        }
        return todo;
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();
    updateTodos((todos) => todos.filter((_, i) => i !== idx));
  };

  return (
    <li key={id} flex justify-between px-10>
      <p
        onClick={(e) => deleteHandler(e)}
        cursor-pointer
        flex
        gap-4
        className={`${
          done
            ? "line-through text-gray-200 hover:brightness-90"
            : "hover:text-black"
        }`}
      >
        {`${idx + 1}. ${todo.text}`}
      </p>
      <div
        className={`i-lucide:x ${
          done ? "text-gray-200 hover:brightness-90" : "hover:text-black"
        }`}
        cursor-pointer
        onClick={(e) => removeHandler(e)}
      ></div>
    </li>
  );
};

export default TodoListItem;
