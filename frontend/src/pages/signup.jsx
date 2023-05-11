import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nome, email, senha);
  };

  return (
    <>
      <form action="" className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4">Sign up</h3>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
            Nome:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            id="nome"
            type="text"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="senha">
            Senha:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            id="senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign up
        </button>
      </form>
      <div className="fixed left-0 bottom-0 mb-8 ml-8">
        <Link
          href="/"
          className="flex items-center text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
        >
          <svg
            className="h-6 w-6 mr-2 transform rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </Link>
      </div>
    </>
  );
}
