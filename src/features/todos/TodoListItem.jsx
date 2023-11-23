import { useState } from "react";

const TodoListItem = ({
  olderIdx,
  idx,
  id,
  todo,
  onUpdateList,
  onUpdateListOnDrag,
  onCommitList,
  onRollback,
  onSetDragItem,
  onSetDragOverItem,
}) => {
  // console.log("[R] Todo List Item: ", idx);
  const [done, setDone] = useState(todo.done);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);

  // logic
  const deleteHandler = (e) => {
    setDone((done) => !done);

    onUpdateList((todoList) =>
      todoList.map((todo, i) => {
        if (i === idx) {
          todo.done = !done;
        }
        return todo;
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();
    onUpdateList((todoList) => todoList.filter((_, i) => i !== idx));
  };

  // mouse hover
  const mouseEnterHandler = (e) => {
    setHovering(true);
  };

  const mouseLeaveHandler = (e) => {
    setHovering(false);
  };

  // drag & drop
  const dragStartHandler = (e) => {
    // prevent showing + sign
    e.dataTransfer.effectAllowed = "move";

    // set current dragged item
    onSetDragItem(idx);

    // for css styling of ghost element
    setTimeout(() => {
      // reset styling
      setDragging(true);
    }, 0);
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();

    // let update happend in the parent list component
    onUpdateListOnDrag(idx);
  };

  const dragEndHandler = (e) => {
    e.preventDefault();

    // when dropped in deviated area
    !dropped && onRollback(e);

    // initialize
    dragging && setDragging(false);
    dropped && setDropped(false);

    onSetDragItem(null);
    onSetDragOverItem(null);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    onCommitList();
    setDropped(true);
  };

  const editHandler = (e) => {
    e.preventDefault();
    // onUpdateList((todoList) =>
    //   todoList.map((todo, i) => {
    //     if (i === idx) {
    //      // input text 받아서 처리
    //     }
    //     return todo;
    //   })
    // );
  };

  return (
    <li
      key={id}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onDragStart={dragStartHandler}
      onDragEnter={dragEnterHandler}
      onDragEnd={dragEndHandler}
      onDrop={dropHandler}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrag={(e) => e.preventDefault()}
      draggable
      className={`flex justify-between items-center cursor-pointer gap-6 pl-9 pr-9 py-3 rounded-lg ${
        dragging && "bg-gray-50 text-transparent"
      }`}
    >
      {/* {hovering && (
        <div
          className={`i-lucide:pencil ${
            done ? "text-gray-200 hover:brightness-90" : "hover:text-gray-500"
          }`}
          cursor-pointer
          onClick={(e) => editHandler(e)}
        ></div>
      )} */}
      <p
        onClick={(e) => deleteHandler(e)}
        cursor-pointer
        flex
        gap-4
        flex-1
        className={`${
          done
            ? "line-through text-gray-200 hover:brightness-90"
            : "hover:text-black"
        }`}
      >
        {`${olderIdx + 1}. ${todo.text}`}
      </p>
      {hovering && (
        <div
          className={`i-lucide:x ${
            done ? "text-gray-200 hover:brightness-90" : "hover:text-black"
          }`}
          cursor-pointer
          onClick={(e) => removeHandler(e)}
        ></div>
      )}
    </li>
  );
};

export default TodoListItem;
