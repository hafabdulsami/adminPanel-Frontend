import React from "react";
import { X } from "lucide-react";
const DialogBox = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DialogBox;
