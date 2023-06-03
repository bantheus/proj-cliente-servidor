import { baseUrl } from "@/api/baseUrl";
import Navbar from "@/components/navbar";
import OccurrenceForm from "@/components/occurrenceForm/occurrenceForm";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

export default function HomePage() {
  const [occurrences, setOccurrences] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { user } = useAuthContext();
  const occurrencesPerPage = 6;
  const pagesVisited = pageNumber * occurrencesPerPage;

  useEffect(() => {
    const fetchOccurrences = async () => {
      const response = await fetch(`${baseUrl}/occurrences`);
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setOccurrences(json);
      }
    };

    fetchOccurrences();
  }, []);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "dd-MM-yyyy HH:mm:ss");
  };

  const pageCount = Math.ceil(occurrences?.length / occurrencesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const renderOccurrencesTable = () => {
    return (
      <div className="table-responsive">
        <table className="w-full overflow-hidden rounded-lg bg-gray-800 text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Tipo de Ocorrência
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Data da Ocorrência
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Local
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">KM</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Criado por
              </th>
            </tr>
          </thead>
          <tbody>
            {occurrences
              .slice(pagesVisited, pagesVisited + occurrencesPerPage)
              .map((occurrence, index) => (
                <tr
                  key={occurrence.id}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                >
                  <td className="px-6 py-4">{occurrence.occurrence_type}</td>
                  <td className="px-6 py-4">
                    {formatDateTime(occurrence.registered_at)}
                  </td>
                  <td className="px-6 py-4">{occurrence.local}</td>
                  <td className="px-6 py-4">{occurrence.km}</td>
                  <td className="px-6 py-4">{occurrence.user_id}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOccurrencesCards = () => {
    return (
      <div>
        {occurrences
          .slice(pagesVisited, pagesVisited + occurrencesPerPage)
          .map((occurrence, index) => (
            <div
              key={occurrence.id}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } mb-4 rounded-lg p-4`}
            >
              <p className="text-lg font-semibold">
                Tipo de Ocorrência: {occurrence.occurrence_type}
              </p>
              <p className="text-sm">
                Data da Ocorrência: {formatDateTime(occurrence.registered_at)}
              </p>
              <p className="text-sm">Local: {occurrence.local}</p>
              <p className="text-sm">KM: {occurrence.km}</p>
              <p className="text-sm">Criado por: {occurrence.user_id}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="px min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col px-8 pt-8 md:flex-row">
        <div className="w-full pr-0 md:w-3/4 md:pr-4">
          {Array.isArray(occurrences) && occurrences.length > 0 ? (
            <div className="hidden md:block">{renderOccurrencesTable()}</div>
          ) : (
            <p className="text-white">Nenhuma ocorrência encontrada.</p>
          )}

          {Array.isArray(occurrences) && occurrences.length > 0 ? (
            <div className="md:hidden">{renderOccurrencesCards()}</div>
          ) : null}

          {occurrences && occurrences.length > occurrencesPerPage && (
            <div className="mt-4 flex justify-center">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="pagination flex space-x-2 text-white"
                pageClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                previousClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                nextClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                disabledClassName="opacity-50 cursor-not-allowed"
                activeClassName="bg-cyan-700 font-bold hover:bg-cyan-600"
                previousLinkClassName="flex items-center"
                nextLinkClassName="flex items-center"
                previousLinkLabel={<i className="fas fa-chevron-left"></i>}
                nextLinkLabel={<i className="fas fa-chevron-right"></i>}
              />
            </div>
          )}
        </div>

        <div className="mt-4 w-full pl-0 md:mt-0 md:w-1/4 md:pl-4">
          {user ? (
            <OccurrenceForm />
          ) : (
            <div className="rounded-lg bg-gray-800 p-4">
              <p className="text-white">
                Você precisa estar logado para criar uma ocorrência.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
