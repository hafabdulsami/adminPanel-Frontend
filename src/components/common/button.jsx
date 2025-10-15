import React from "react";
import { Plus } from "lucide-react";
const Button = ({ onClick, size, text }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 
                     transition-all duration-200 shadow-md hover:shadow-lg font-medium"
    >
      <Plus size={size} /> {text}
    </button>
  );
};

export default Button;
