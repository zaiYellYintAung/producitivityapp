"use client";

import { useState } from "react";
import Login from "./../auth/Login";
import Register from "./../auth/Register";

interface Props {
  openAuth: () => void;
}

const DesktopNavbar: React.FC<Props> = ({ openAuth }) => {
  return (
    <main className="hidden lg:block bg-superwhite text-superblack font-semibold container mx-auto">
      <div className="flex w-full justify-between py-1.5 px-2 lg:px-4 items-center border-b border-gray-100">
        <section className="flex items-center">
          <a className="ml-2 mr-4 font-bold text-lg">Home</a>
          <div className="flex item-center font-semibold text-sm text-slate-600 hover:text-superblack">
            <a className="mx-4 ">Features</a>
            <a className="mx-4 ">About</a>
            <a className="mx-4 ">Contact</a>
            <a className="mx-4 ">Blank</a>
          </div>
        </section>
        <section>
          <div>
            <button
              onClick={openAuth}
              className="mx-3 px-4 py-1.5 border border-superblack rounded-lg w-[80px] font-normal text-center text-sm bg-black text-superwhite">
              Login
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DesktopNavbar;