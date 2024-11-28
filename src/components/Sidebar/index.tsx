import {
  AppsOutline,
  GridOutline,
  HomeOutline,
  LogOutOutline,
} from "react-ionicons";

function Sidebar() {
  const navLinks = [
    {
      title: "Home",
      icon: <HomeOutline color="#A1A1AA" width="22px" height="22px" />,
      active: false,
    },
    {
      title: "Boards",
      icon: <AppsOutline color="#A1A1AA" width="22px" height="22px" />,
      active: true,
    },
    {
      title: "Projects",
      icon: <GridOutline color="#A1A1AA" width="22px" height="22px" />,
      active: false,
    },
  ];

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-zinc-900">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">
          Kanban
        </span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">
          K.
        </span>
      </div>
      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-zinc-700 bg-zinc-900 py-5 md:px-3 px-3 relative">
        {navLinks.map((link) => {
          return (
            <div
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-700 px-2 py-3 cursor-pointer ${
                link.active ? "bg-orange-700" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className="font-medium text-[15px] md:block hidden text-zinc-300">
                {link.title}
              </span>
            </div>
          );
        })}
        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-700 px-2 py-3 cursor-pointer bg-zinc-800">
          <LogOutOutline color="#A1A1AA" width="22px" height="22px" />
          <span className="font-medium text-[15px] md:block hidden text-zinc-300">
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
