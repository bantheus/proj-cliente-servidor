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
  const [password, setSenha] = useState("");
  const { login, message, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-800">
      <div className="card alig">
        <div className="card-img md:max-h-[90vh]">
          <div className="flex h-full items-center justify-center">
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

        <div className="max-h-[90vh] w-full max-w-md md:max-h-[90vh] 2xl:max-h-[70vh]">
          <div className="card-input">
            <h3 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
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
                value={password}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Button tipo="submit" texto="Login" disabled={isLoading} />
              {message && <Error erroMensagem={message} />}
            </form>
            <div className="mt-6 flex">
              <Link
                href="/signup"
                className="ripple btn group flex w-1/2 items-center justify-center text-base"
                type="submit"
              >
                Criar Conta
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 transition duration-300 group-hover:translate-x-1 "
                  width="16"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
