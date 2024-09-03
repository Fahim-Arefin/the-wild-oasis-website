"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteBooking = () => {
    startTransition(() => {
      onDelete(bookingId);
    });
  };

  return (
    <button className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <div className="flex" onClick={handleDeleteBooking}>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </div>
      )}
    </button>
  );
}

export default DeleteReservation;

// import { TrashIcon } from "@heroicons/react/24/solid";
// import { deleteReservationById } from "../_lib/action";

// function DeleteReservation({ bookingId }) {
//   return (
//     <form
//       action={deleteReservationById.bind(null, bookingId)}
//       className="group flex items-center gap-2  text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer"
//     >
//       <button type="submit" className="flex items-center uppercase">
//         <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors mr-1 " />
//         <span className="mt-1">Delete</span>
//       </button>
//     </form>
//   );
// }

// export default DeleteReservation;
