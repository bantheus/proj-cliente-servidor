import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useSignup } from "@/hooks/useSignup";
import Error from "@/components/error";

export default function Signup() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const { signup, message, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-800">
      <div className="card">
        <div className="card-img md:max-h-[90vh]">
          <div className="flex h-full items-center justify-center">
            <Image
              src="/road2.jpg"
              alt="rua"
              width={600}
              height={400}
              quality={100}
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="max-h-[100vh] w-full max-w-md md:max-h-[90vh] md:w-[50%] 2xl:max-h-[70vh] ">
          <div className="card-input">
            <h3 className="mb-4 text-center text-3xl font-bold text-white md:mb-1 lg:mb-4">
              <span className="text-cyan-500 ">C</span>adastro
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                tipo="text"
                texto="Nome"
                placeholder="Digite seu nome"
                name="nome"
                value={name}
                onChange={(e) => setNome(e.target.value)}
              />

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
                value={password}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Button tipo="submit" texto="Cadastrar" disabled={isLoading} />
              {message && <Error erroMensagem={message} />}
            </form>
            <div className="mt-6 flex md:mt-3 lg:mt-6">
              <Link
                href="/"
                className="ripple btn group flex items-center justify-center"
                type="submit"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-2 transition duration-300 group-hover:-translate-x-1"
                  width="16"
                />
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
