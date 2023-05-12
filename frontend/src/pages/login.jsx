import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nome, email, senha);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-row justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md w-[50%] rounded-l-md max-h-[90vh] shadow-lg overflow-hidden hidden md:block">
          <div className="flex items-center justify-center h-full">
            <Image
              src="/road2.jpg"
              alt="rua"
              width={600}
              height={400}
              quality={100}
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-md md:w-[50%] w-full max-h-[90vh]">
          <div className="bg-gray-700 shadow-lg rounded-e-md md:rounded-s-none  rounded-s-md p-8 h-full">
            <h3 className="md:text-4xl text-3xl font-bold mb-4 text-center text-white">
              <span className="text-cyan-500 ">Report</span>Trânsito
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                tipo="email"
                texto="Email"
                placeholder="Digite seu email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                tipo="password"
                texto="Senha"
                placeholder="Digite sua senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Button tipo="submit" texto="Login" />
            </form>
            <div className="flex mt-6">
              <Link
                href="/signup"
                className="group mx-auto bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ripple transform text-center md:w-[50%]"
                type="submit"
              >
                Criar Conta
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:-translate-x-1 transition duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
