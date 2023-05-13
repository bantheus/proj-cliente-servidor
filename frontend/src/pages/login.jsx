import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useLogin } from "@/hooks/useLogin";
import Error from "@/components/error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, senha);
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
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-md md:w-[50%] w-full max-h-[90vh]">
          <div className="card-input">
            <h3 className="md:text-4xl text-3xl font-bold mb-4 text-center text-white">
              <span className="text-cyan-500 ">ReporT</span>rânsito
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

              <Button tipo="submit" texto="Login" disabled={isLoading} />
              {error && <Error erroMensagem={error} />}
            </form>
            <div className="flex mt-6">
              <Link
                href="/signup"
                className="group ripple btn w-1/2 text-base"
                type="submit"
              >
                Criar Conta
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:translate-x-1 transition duration-300 "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
