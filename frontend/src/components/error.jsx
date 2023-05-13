export default function Error({ erroMensagem }) {
  return (
    <>
      <div
        className=" bg-red-100 border border-red-400 text-red-700 px-2 py-1 lg:py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline text-sm lg:text-base">
          {erroMensagem}
        </span>
      </div>
    </>
  );
}
