import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUpdate } from "@/hooks/useUpdate";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const { update, isLoading } = useUpdate();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await update(name, email, password);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div
          className={`rounded-md bg-gray-800 p-8 ${
            changePassword ? "w-96" : "w-96"
          }`}
        >
          <h1 className="mb-4 text-center text-xl text-white">Alterar dados</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-white">
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-md bg-gray-700 p-2 text-white"
              />
            </label>
            <br />
            <label className="text-white">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md bg-gray-700 p-2 text-white"
              />
            </label>
            <br />
            <div className="mt-3 flex items-center">
              <label className="flex items-center text-white">
                <span className="mr-2">Alterar senha:</span>
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={(e) => setChangePassword(e.target.checked)}
                  className="form-checkbox mt-1 text-cyan-700"
                />
              </label>
            </div>

            {changePassword && (
              <>
                <br />
                <label className="text-white">
                  Nova senha:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-md bg-gray-700 p-2 text-white"
                  />
                </label>
              </>
            )}
            <br />
            <button
              type="submit"
              className="mt-4 rounded-md bg-cyan-700 px-4 py-2 text-white"
              disabled={isLoading}
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
