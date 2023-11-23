import format from "date-fns/format";
import { useEffect, useRef, useState } from "react";
import Header, { HeaderContainer } from "./features/header/Header";
import SummaryContainer from "./features/summaries/SummaryContainer";
import SummaryInput from "./features/summaries/SummaryInput";
import SummaryList from "./features/summaries/SummaryList";
import TodoDone from "./features/todos/TodoDone";
import TodoInput from "./features/todos/TodoInput";
import TodoList from "./features/todos/TodoList";
import TodoListContainer from "./features/todos/TodoListContainer";
import { generateRandomString } from "./helpers";
import AppContainer from "./ui/AppContainer";

function App() {
  console.log("[R] App");

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
  const done = todos.length > 0 && todos.every((v) => v.done === true);

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
      <AppContainer>
        <HeaderContainer>
          <Header done={done} />
        </HeaderContainer>
        <TodoListContainer>
          <TodoInput
            onFocusStyle={
              document.activeElement === inputRef.current &&
              "focus:border focus:border-gray-800"
            }
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={keyDownHandler}
            inputValue={input}
            inputRef={inputRef}
            doneTasks={todos.filter((v) => v.done === true).length}
            totalTasks={todos.length}
          />
          <TodoList todos={todos} updateTodos={onSetTodos} />
        </TodoListContainer>
        {done && (
          <SummaryContainer>
            <SummaryInput
              onChange={(e) => setSummaryInput(e.target.value)}
              onKeyDown={summaryKeyDownHandler}
              inputValue={summaryInput}
              inputRef={summaryInputRef}
            />
            <SummaryList sums={sums} onClick={removeSumHandler} />
          </SummaryContainer>
        )}
      </AppContainer>
    </>
  );
}

export default App;
