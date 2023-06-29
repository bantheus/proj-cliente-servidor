import { baseUrl } from "@/api/baseUrl";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OccurrenceForm({setOccurrence}) {
  const [registeredAt, setRegisteredAt] = useState("");
  const [local, setLocal] = useState("");
  const [km, setKm] = useState("");
  const [occurrenceType, setOccurrenceType] = useState("");
  const currentDateTime = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : "";
    const id = user ? user.id : "";

    const inputDate = new Date(registeredAt);
    const adjustedDate = new Date(inputDate.getTime() - inputDate.getTimezoneOffset() * 60000);

    const occurrence = {
      registered_at: adjustedDate.toISOString(),
      local: local,
      occurrence_type: Number(occurrenceType),
      km: Number(km),
      user_id: id,
    };

    const response = await fetch(`${baseUrl}/occurrences`, {
      method: "POST",
      body: JSON.stringify(occurrence),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.message);
    }

    if (response.ok) {
      setRegisteredAt("");
      setLocal("");
      setKm("");
      setOccurrenceType("");
      setOccurrence([]);
      toast.success("Ocorrência adicionada com sucesso!");
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 px-6 py-3 shadow-md">
      <h3 className="mb-4 text-lg font-medium text-white">
        Adicionar uma ocorrência
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Data e Hora:
          </label>
          <input
            type="datetime-local"
            value={registeredAt}
            onChange={(event) => setRegisteredAt(event.target.value)}
            max={currentDateTime}
            className="w-full rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Local:
          </label>
          <input
            type="text"
            value={local}
            onChange={(event) => setLocal(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Tipo de Ocorrência:
          </label>
          <select
            value={occurrenceType}
            onChange={(event) => setOccurrenceType(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="1">Atropelamento</option>
            <option value="2">Deslizamento</option>
            <option value="3">Colisão frontal</option>
            <option value="4">Capotagem</option>
            <option value="5">Saída de pista</option>
            <option value="6">Batida em objeto fixo</option>
            <option value="7">Veículo avariado</option>
            <option value="8">Colisão com motocicletas</option>
            <option value="9">Colisão no mesmo sentido ou transversal</option>
            <option value="10">Construção</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Distância (km):
          </label>
          <input
            type="number"
            value={km}
            onChange={(event) => setKm(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
