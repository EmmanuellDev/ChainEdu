import React from "react";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <nav className="p-4 bg-black border-b-2 shadow-md border-violet-900">
      <div className="container flex items-center justify-center mx-auto">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-blue-100" />
          <h1 className="text-3xl font-bold transition-all duration-300 text-violet-400 hover:text-blue-100">
            ChainED
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
