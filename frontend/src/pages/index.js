import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>PÁGINA PRINCIPAL</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </>
  );
}
