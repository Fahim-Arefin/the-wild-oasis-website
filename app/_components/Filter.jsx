"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleClick = (filter) => {
    // build the url
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    // set the url
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <button
        onClick={() => handleClick("all")}
        className={`px-2 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-800" : ""
        }`}
      >
        All Cabins
      </button>
      <button
        onClick={() => handleClick("small")}
        className={`px-2 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-800" : ""
        }`}
      >
        1-3 guests
      </button>
      <button
        onClick={() => handleClick("medium")}
        className={`px-2 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-800" : ""
        }`}
      >
        4-7 guests
      </button>
      <button
        onClick={() => handleClick("large")}
        className={`px-2 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-800" : ""
        }`}
      >
        8-12 guests
      </button>
    </div>
  );
}

export default Filter;
