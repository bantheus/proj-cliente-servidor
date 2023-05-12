export default function Button({ tipo, texto }) {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 w-full ripple transform"
        type={tipo}
      >
        {texto}
      </button>
    </div>
  );
}
