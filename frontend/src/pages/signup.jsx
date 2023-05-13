import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nome, email, senha);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <div className="card">
        <div className="card-img">
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
          <div className="card-input">
            <h3 className="text-3xl font-bold mb-4 text-center text-white">
              Sign up
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                tipo="text"
                texto="Nome"
                placeholder="Digite seu nome"
                name="nome"
                value={nome}
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Button tipo="submit" texto="Cadastrar" />
            </form>
            <div className="flex mt-6">
              <Link href="/" className="group ripple btn" type="submit">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-2 group-hover:-translate-x-1 transition duration-300"
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
