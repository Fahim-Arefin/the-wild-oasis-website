import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) {
    notFound();
  }
  return {
    title: `Cabin ${cabin.name}`,
  };
}
export default async function Page({ params: { cabinId } }) {
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
