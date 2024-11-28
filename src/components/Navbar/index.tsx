import { PersonCircle } from "react-ionicons";

function Navbar() {
  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-zinc-700 bg-zinc-900">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="" width={"28px"} height={"28px"} />
        <span className="text-purple-600 font-semibold md:text-lg text-sm whitespace-nowrap">
          Task Board
        </span>
      </div>
    </div>
  );
}

export default Navbar;
