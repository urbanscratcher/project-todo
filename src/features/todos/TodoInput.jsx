import Input from "../../ui/Input";

function TodoInput({
  inputRef,
  onChange,
  onKeyDown,
  inputValue,
  iconStr,
  placeholder,
  onFocusStyle,
}) {
  return (
    <Input
      iconStr="i-lucide:plus"
      placeholder="Today I'll..."
      onFocusStyle={onFocusStyle}
      onChange={onChange}
      onKeyDown={onKeyDown}
      inputValue={inputValue}
      inputRef={inputRef}
    />
  );
}

export default TodoInput;
