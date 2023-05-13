export default function Input({
  tipo,
  texto,
  name,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="mb-4 md:mb-1 lg:mb-4">
      <label
        className="block text-gray-400 font-bold mb-2 md:mb-1 lg:mb-2"
        htmlFor={name}
      >
        {texto}:
      </label>
      <input
        className="border-b-2 border-cyan-500 bg-gray-600 p-3 w-full focus:outline-none focus:border-cyan-300  text-white"
        id={name}
        type={tipo}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
