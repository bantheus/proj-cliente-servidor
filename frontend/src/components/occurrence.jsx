export default function OccurrenceCard({ occurrence }) {
  return (
    <table className="rounded-lg bg-white p-6 shadow-md">
      <tbody>
        <tr>
          <td className="font-bold">Tipo de Ocorrência:</td>
          <td>{occurrence.occurrence_type}</td>
        </tr>
        <tr>
          <td className="font-bold">Data da ocorrência:</td>
          <td>{occurrence.registered_at}</td>
        </tr>
        <tr>
          <td className="font-bold">Local:</td>
          <td>{occurrence.local}</td>
        </tr>
        <tr>
          <td className="font-bold">KM:</td>
          <td>{occurrence.km}</td>
        </tr>
        <tr>
          <td className="font-bold">Criado por:</td>
          <td>{occurrence.user_id}</td>
        </tr>
      </tbody>
    </table>
  );
}
