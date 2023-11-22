import { useEffect, useRef, useState } from "react";
import { generateRandomString } from "./helpers";
import Input from "./Input";
import format from "date-fns/format";
import { ko } from "date-fns/locale";

function App() {
  console.log("App Rendering...");
  let now = new Date();

  const dateStr = format(now, "yyyy-MM-dd");
  const savedTodos = window.localStorage.getItem("todos");
  const savedToday = savedTodos ? JSON.parse(savedTodos)[dateStr] : null;

  const [sums, setSums] = useState(savedToday?.sums ?? []);
  const [todos, setTodos] = useState(savedToday?.todos ?? []);
  const [input, setInput] = useState("");
  const [summaryInput, setSummaryInput] = useState("");
  const inputRef = useRef("");
  const summaryInputRef = useRef("");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (
        document.activeElement === inputRef?.current ||
        document.activeElement === summaryInputRef?.current
      )
        return;

      if (inputRef?.current && e.key === "Enter") {
        inputRef.current.focus();
      }
    });
  }, []);

  useEffect(() => {
    console.log("Saving...");
    saveHandler();
  }, [todos, sums]);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSetTodos = (todos) => {
    setTodos(todos);
  };

  const keyDownHandler = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && input !== "") {
      setTodos((todos) => [
        ...todos,
        { text: input, done: false, id: generateRandomString(3) },
      ]);

      setInput("");
    }
  };

  const summaryKeyDownHandler = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && summaryInput !== "") {
      setSummaryInput("");
      setSums((summaryInputs) => [
        ...summaryInputs,
        { text: e.target.value, id: generateRandomString(3) },
      ]);
    }
  };

  const removeSumHandler = (e, idx) => {
    e.stopPropagation();
    setSums((sums) => sums.filter((_, i) => i !== idx));
  };

  const saveHandler = () => {
    const rawPrevTodos = window.localStorage.getItem("todos");
    const prevTodos = rawPrevTodos ? JSON.parse(rawPrevTodos) : null;

    const newObj = {};
    newObj[dateStr] = {
      todos: todos,
      sums: sums,
    };

    const prevObj = prevTodos ? Object.assign(prevTodos, newObj) : newObj;
    window.localStorage.setItem("todos", JSON.stringify(prevObj));
  };

  return (
    <>
      <div
        w-4xl
        mx-auto
        pt-25
        flex
        flex-col
        gap-12
        min-h-screen
        className="text-zinc-700"
      >
        <div className="grid grid-cols-[max-content_max-content] items-end gap-4">
          <p text-4xl>{format(now, "yyyy. MM. dd. (ccc)", { locale: ko })}</p>
          {todos.length > 0 && todos.every((v) => v.done === true) && (
            <p text-2xl>Done!</p>
          )}
        </div>
        <div flex flex-col gap-6>
          <Input
            onFocusStyle={
              document.activeElement === inputRef.current &&
              "focus:border focus:border-gray-800 "
            }
            iconStr="i-lucide:plus"
            placeholder="Today I'll..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={keyDownHandler}
            inputValue={input}
            inputRef={inputRef}
          />
          <ol text-3xl flex flex-col gap-5>
            {todos.map((v, i) => (
              <TodoListItem
                key={v.id}
                id={v.id}
                idx={i}
                updateTodos={onSetTodos}
                todo={v}
              />
            ))}
          </ol>
        </div>
        {todos.length > 0 && todos.every((v) => v.done === true) && (
          <>
            <div flex flex-col gap-6>
              <Input
                onFocusStyle={"focus:border focus:border-gray-800 "}
                iconStr="i-lucide:plus"
                placeholder="To wrap up, I did..."
                onChange={(e) => setSummaryInput(e.target.value)}
                onKeyDown={summaryKeyDownHandler}
                inputValue={summaryInput}
                inputRef={summaryInputRef}
              />
              <ol text-3xl flex flex-col gap-5>
                {sums.map((v, idx) => (
                  <li key={v.id} id={v.id} flex justify-between px-10>
                    <p flex gap-4>
                      {`${idx + 1}. ${v.text}`}
                    </p>
                    <div
                      className={`i-lucide:x hover:text-black`}
                      cursor-pointer
                      onClick={(e) => removeSumHandler(e, idx)}
                    ></div>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

export const TodoListItem = ({ id, updateTodos, idx, doneInit, todo }) => {
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
