"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function UpdateProfileButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800
      font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed
      disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "updateBooking..." : "Update profile"}
    </button>
  );
}

export default UpdateProfileButton;
