import { notFound } from "next/navigation";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  console.log(filter);

  const cabins = await getCabins();
  // console.log(cabins);

  if (!cabins || !cabins.length > 0) {
    notFound();
  }

  let filteredCabins;
  if (filter === "all") {
    filteredCabins = cabins;
  } else if (filter === "small") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filter === "medium") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  } else if (filter === "large") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity > 8);
  }

  return (
    <>
      {filteredCabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default CabinList;
