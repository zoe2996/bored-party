"use client";

import { useEffect } from "react";
import { PiUserSwitch } from "react-icons/pi";
export const TEAM_BLUE: string = "BLUE";
export const TEAM_RED: string = "RED";

interface TeamToggleProps {
  onChangeTeam: Function;
  currentTeam: string;
}

export function TeamToggle({ currentTeam, onChangeTeam }: TeamToggleProps) {

  function switchTeam() {
    if (currentTeam == TEAM_BLUE) {
      onChangeTeam(TEAM_RED);
    } else {
      onChangeTeam(TEAM_BLUE);
    }
  }


  return (
    <>
      <div className="grid grid-cols-5 gap-5 px-4 w-full">
        <button
          className="col-auto bg-orange-500 text-white text-center text-5xl flex items-center justify-center disabled:bg-gray-500 disabled:text-gray-700  rounded-xl font-bold py-4 px-4"
          onClick={() => {
            switchTeam();
          }}
        >
          <PiUserSwitch />
        </button>
        <button
          className="col-span-2 bg-blue-600 text-white  disabled:bg-gray-500 disabled:text-gray-700  rounded-md font-bold py-2 px-4"
          disabled={currentTeam === TEAM_RED}
        >
          Blue
        </button>
        <button
          className="col-span-2 bg-red-600 text-white  disabled:bg-gray-500 disabled:text-gray-700 rounded-md font-bold py-2 px-4"
          disabled={currentTeam === TEAM_BLUE}
        >
          Red
        </button>
      </div>
    </>
  );
}
