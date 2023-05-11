import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nome, email, senha);
  };

  return (
    <>
      <form action="" className="" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Senha:</label>
        <input
          type="password"
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
        />

        <button>Login</button>
      </form>

      <Link href="/">voltar</Link>
    </>
  );
}
