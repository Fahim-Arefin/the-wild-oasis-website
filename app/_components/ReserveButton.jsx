"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function ReserveButton({ pendingText, children }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-4 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingText : children}
    </button>
  );
}

export default ReserveButton;
