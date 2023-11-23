import Input from "../../ui/Input";

function TodoInput({
  inputRef,
  onChange,
  onKeyDown,
  inputValue,
  iconStr,
  placeholder,
  onFocusStyle,
  doneTasks,
  totalTasks,
}) {
  const isDone = totalTasks > 0 && doneTasks === totalTasks;
  return (
    <Input
      size={isDone ? "md" : "lg"}
      iconStr={isDone ? `i-lucide:chevron-down` : `i-lucide:plus`}
      placeholder={
        isDone
          ? `All tasks are done (${totalTasks}/${totalTasks})`
          : `Today I'll...`
      }
      onFocusStyle={onFocusStyle}
      onChange={onChange}
      onKeyDown={onKeyDown}
      inputValue={inputValue}
      inputRef={inputRef}
    />
  );
}

export default TodoInput;
