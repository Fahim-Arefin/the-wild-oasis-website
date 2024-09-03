import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <div>loading cabin data ...</div>
    </div>
  );
}
export default loading;
