import TodoListItem from "./TodoListItem";

function TodoList({ todos, updateTodos }) {
  return (
    <ol className="text-3xl flex flex-col gap-5">
      {todos.map((v, i) => (
        <TodoListItem
          key={v.id}
          id={v.id}
          idx={i}
          updateTodos={updateTodos}
          todo={v}
        />
      ))}
    </ol>
  );
}

export default TodoList;
