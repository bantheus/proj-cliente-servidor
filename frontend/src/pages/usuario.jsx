import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUpdate } from "@/hooks/useUpdate";
import { useDelete } from "@/hooks/useDelete";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const { update, isLoading } = useUpdate();
  const { deleteUser } = useDelete();

  const { user } = useAuthContext();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const handleDelete = async (e) => {
    e.preventDefault();

    const op = window.confirm("Deletar?");

    if (op) {
      await deleteUser();
    }
  };

  // const confirmDelete = async () => {
  //   await deleteUser();
  //   setShowDeleteConfirmation(false);
  // };

  // const cancelDelete = () => {
  //   setShowDeleteConfirmation(false);
  // };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div
          className={`rounded-md bg-gray-800 p-8 ${
            changePassword ? "w-96" : "w-96"
          }`}
        >
          <h1 className="mb-4 text-center text-xl text-white">
            Opções da conta
          </h1>
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
            <div className="flex flex-col justify-between md:flex-row">
              <button
                type="submit"
                className="mt-4 min-w-[150px] rounded-md bg-cyan-700 px-4 py-2 text-white"
                disabled={isLoading}
              >
                Atualizar
              </button>
              <button
                onClick={handleDelete}
                className="mt-4 min-w-[150px] rounded-md bg-red-700 px-4 py-2 text-white"
                disabled={isLoading}
              >
                Deletar Usuário
              </button>
            </div>
          </form>

          {/* {showDeleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="rounded-md bg-white p-8">
                <h2 className="mb-4 text-lg font-semibold">
                  Confirmar exclusão
                </h2>
                <p>Tem certeza que deseja excluir sua conta?</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white"
                    onClick={confirmDelete}
                  >
                    Concordo
                  </button>
                  <button
                    className="rounded-md bg-gray-300 px-4 py-2 text-gray-800"
                    onClick={cancelDelete}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
