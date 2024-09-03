"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

// export async function signInAction({ callbackUrl = "/" }) {
//   await signIn("google", { redirectTo: callbackUrl });
// }

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }
  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  console.log(updateData);
  await updateGuest(session.user.guestId, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservationById(bookingId, formdata) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingById(bookingId, formData) {
  // authentication check
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
  };

  const id = Number(bookingId);

  // update data
  await updateBooking(id, updateData);

  // revalidate path
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // redirect
  redirect("/account/reservations");
}

export async function createReservation(remainingBookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const newBookingData = {
    ...remainingBookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: remainingBookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log(newBookingData);
  await createBooking(newBookingData);
  revalidatePath(`/cabins/${remainingBookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
