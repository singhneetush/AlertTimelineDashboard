import { CircleUserRound } from "lucide-react";
import React from "react";

function NavigationBar() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-4xl font-bold">
          Alert <span className="block sm:inline">Dashboard</span>
        </h1>
        <div className="  p-1 hover:bg-slate-600 rounded-full">
          <CircleUserRound className="h-10 w-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
