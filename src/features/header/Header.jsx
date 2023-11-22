import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DoneMessage from "./DoneMessage";
import { H2 } from "../../ui/Heading";

export function HeaderContainer({ children }) {
  console.log("[R] HeaderContainer");
  return (
    <div className="grid grid-cols-[max-content_max-content] items-end gap-4">
      {children}
    </div>
  );
}

function Header({ done }) {
  console.log("[R] Header");

  return (
    <>
      <H2>{format(new Date(), "yyyy. MM. dd. (ccc)", { locale: ko })}</H2>
      {done && <DoneMessage />}
    </>
  );
}

export default Header;
