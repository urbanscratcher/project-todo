function TodoDone({ todoList }) {
  console.log("[R] Todo Done");
  return (
    <div onClick={(e) => {}} className="flex justify-between px-7 items-center">
      <p>
        What you've done today{" "}
        <span>
          ({todoList.filter((todo) => todo.done === true).length}/
          {todoList.length})
        </span>
      </p>
      <div className="i-lucide:chevron-down"></div>
    </div>
  );
}

export default TodoDone;
