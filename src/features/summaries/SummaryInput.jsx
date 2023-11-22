import Input from "../../ui/Input";

function SummaryInput({ onChange, onKeyDown, inputValue, inputRef }) {
  return (
    <Input
      onFocusStyle={"focus:border focus:border-gray-800"}
      iconStr="i-lucide:plus"
      placeholder="To wrap up, I did..."
      onChange={onChange}
      onKeyDown={onKeyDown}
      inputValue={inputValue}
      inputRef={inputRef}
    />
  );
}

export default SummaryInput;
