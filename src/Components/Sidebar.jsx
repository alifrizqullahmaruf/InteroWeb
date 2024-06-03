import logo from "/src/assets/logo.svg";
import avatar from "/src/assets/avatar.png";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="h-screen">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm w-fit">
        <div className="flex items-center justify-between p-4 pb-2">
          <h1 className={`overflow-hidden transition-all ${
              expanded ? "w-32 text-3xl text-blue-500 font-bold" : "w-0"
            }`}>
            SRP
          </h1>

          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-200"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex items-center p-3 border-t">
          <img src={avatar} alt="" className="w-10 h-10" />
          <div
            className={`flex items-center justify-between transition-all overflow-hidden ${
              expanded ? "w-full ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Alifrizm</h4>
              <span className="text-xs text-gray-600 opacity-50">
                alifrizm@gmail.com
              </span>
            </div>
            <MoreVertical size={20} className="flex justify-end"/>
          </div>
        </div>
      </nav>
    </div>
  );
};

export function SidebarItem({ icon, text, active, alert ,onClick}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center px-2 py-3 my-1 font-medium transition-colors ${
        active
          ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
          : "hover:bg-blue-50 text-gray-600"
      } rounded-md cursor-pointer group`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`transition-all ${
          expanded ? "w-52 ml-3" : "w-0 overflow-hidden"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute w-2 h-2 bg-blue-400 rounded right-2 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`
      absolute left-full rounded-md px-2 py-1 ml-6 
      bg-blue-100 text-blue-800 text-sm 
      invisible opacity-20 -translate-x-3 transition-all 
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default Sidebar;
