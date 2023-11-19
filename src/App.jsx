import { useEffect, useRef, useState } from "react";
import {
  LANGUAGE,
  formatDate,
  formatDay,
  generateRandomString,
} from "./helpers";
import Input from "./Input";

function App() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  const [sums, setSums] = useState([]);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef("");
  const [summaryInput, setSummaryInput] = useState("");
  const summaryInputRef = useRef("");

  useEffect(() => {
    const todos = window.localStorage.getItem("todos");
    const savedToday = todos ? JSON.parse(todos)[dateStr] : null;

    if (savedToday) {
      setTodos(savedToday.todos);
      setSums(savedToday.sums);
    }
  }, []);

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

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSetTodos = (todos) => {
    setTodos(todos);
  };

  const keyDownHandler = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && input !== "") {
      todos.push({ text: input, done: false, id: generateRandomString(3) });
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

  const saveHandler = (e) => {
    const prevTodos = window.localStorage.getItem(dateStr);
    const obj = prevTodos ? { ...prevTodos } : {};
    obj[dateStr] = {
      todos: todos,
      sums: sums,
    };

    window.localStorage.setItem("todos", JSON.stringify(obj));

    alert("saved to your local");
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
        <div className="grid grid-cols-[auto_1fr_auto] items-end w-4xl">
          <h2 text-4xl>
            {formatDate(now)} ({formatDay(now, LANGUAGE.KOREAN)})
          </h2>
          {todos.length > 0 && todos.every((v) => v.done === true) && (
            <p text-2xl ml-4>
              Done!
            </p>
          )}
          <div
            onClick={saveHandler}
            mb-1
            justify-self-end
            cursor-pointer
            text-2xl
            rounded-15
            text-zinc-400
            hover:text-zinc-600
            className={`i-lucide:save`}
          ></div>
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
