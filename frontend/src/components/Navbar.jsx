import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-4">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <button className="text-white bg-green-700 my-5 flex justify-between items-center rounded-full ring-1">
          <img className="w-10 p-1" src="icons/github.svg" alt="github logo" />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
