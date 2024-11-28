import {
  NotificationsOutline,
  PersonCircle,
  SearchOutline,
  SettingsOutline,
  ShareSocialOutline,
} from "react-ionicons";

function Navbar() {
  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-zinc-700 bg-zinc-900">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="#fb923c" width={"28px"} height={"28px"} />
        <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
          Task Board
        </span>
      </div>

      <div className="md:w-[800px] w-[130px] bg-zinc-800 rounded-lg px-3 py-[10px] flex items-center gap-2">
        <SearchOutline color={"#A1A1AA"} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-zinc-800 outline-none text-[15px] text-zinc-300 placeholder:text-zinc-500"
        />
      </div>

      <div className="md:flex hidden items-center gap-4">
        <div className="grid place-items-center bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 cursor-pointer transition-colors">
          <ShareSocialOutline color={"#A1A1AA"} />
        </div>
        <div className="grid place-items-center bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 cursor-pointer transition-colors">
          <SettingsOutline color={"#A1A1AA"} />
        </div>
        <div className="grid place-items-center bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 cursor-pointer transition-colors">
          <NotificationsOutline color={"#A1A1AA"} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
