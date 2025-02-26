import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center py-1.5 bottom-0 w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>

      <div className="flex justify-center items-center">
        Created with<img className="w-6 mx-2" src="icons/heart.png" alt="heart logo" />SK
      </div>
    </div>
  );
};

export default Footer;
