import React from 'react';

const Modal = ({ isOpen, title, description, confirmText = 'OK', onConfirm, cancelText, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-200 rounded-lg w-full max-w-sm shadow-lg">
        {title && (
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg text-black font-semibold text-center">{title}</h3>
          </div>
        )}
        {description && (
          <div className="px-4 py-4">
            <p className="text-center text-gray-700">{description}</p>
          </div>
        )}
        <div className="px-4 py-3 flex gap-2  justify-center">
          {cancelText && (
            <button onClick={onCancel} className="px-4 py-2 text-black rounded border-2 border-black  hover:bg-gray-50">
              {cancelText}
            </button>
          )}
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
