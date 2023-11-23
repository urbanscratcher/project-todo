import { useRef } from "react";
import TodoListItem from "./TodoListItem";
import { useState } from "react";
import { useEffect } from "react";

function TodoList({ todos, updateTodos }) {
  console.log("[R] Todo List");

  const [todoList, setTodoList] = useState(todos);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const updateListOnDragHandler = (idx) => {
    const dragItemIdx = dragItem.current;
    const newList = [...todos];
    const draggedItem = todos[dragItemIdx];

    // remove & insert
    newList.splice(dragItemIdx, 1);
    newList.splice(idx, 0, draggedItem);

    // update presented list
    setTodoList(newList);
  };

  const updateListHandler = (newList) => {
    setTodoList(newList);
    updateTodos(newList);
  };

  const commitListHandler = () => {
    updateTodos(todoList);
  };

  const setDragItemHandler = (idx) => {
    dragItem.current = idx;
  };

  const setDragOverItemHandler = (idx) => {
    dragOverItem.current = idx;
  };

  const rollbackHandler = (e) => {
    updateListHandler(todos);
  };

  const isDone = todos.length > 0 && todos.every((v) => v.done === true);

  return (
    <ol className="text-3xl flex flex-col">
      {!isDone &&
        todoList.map((v, i) => (
          <TodoListItem
            olderIdx={todos.findIndex((todo) => todo.id === v.id)}
            key={v.id}
            id={v.id}
            idx={i}
            todo={v}
            onUpdateList={updateListHandler}
            onUpdateListOnDrag={updateListOnDragHandler}
            onCommitList={commitListHandler}
            onRollback={rollbackHandler}
            onSetDragItem={setDragItemHandler}
            onSetDragOverItem={setDragOverItemHandler}
          />
        ))}
      {isDone && <p>done list</p>}
    </ol>
  );
}

export default TodoList;
