import { IPagination } from "@/app/interfaces/IPagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({
  total,
  limit,
  offset,
  currentLength,
  onPageChange,
}: IPagination) {
  const prevPage = () => {
    if (offset > 0) {
      onPageChange(offset - limit);
    }
  };

  const nextPage = () => {
    if (offset + limit < total) {
      onPageChange(offset + limit);
    }
  };

  return (
   <nav aria-label="Page navigation">
      <ul className="flex flex-wrap items-center gap-2 p-1">
        <li>
          <button
            onClick={prevPage}
            disabled={offset === 0}
            className={`px-3 py-1 rounded border flex  border-gray-300 cursor-pointer ${
              offset === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
           <IoIosArrowBack className="mt-1"/>Anterior
          </button>
        </li>
        <li>
          <button
            onClick={nextPage}
            disabled={offset + limit >= total}
            className={`px-3 py-1 rounded border flex border-gray-300 cursor-pointer ${
              offset + limit >= total
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
           Siguiente <IoIosArrowForward className="mt-1"/> 
          </button>
        </li>
        <li className="mt-2 ml-3 text-gray-700 text-sm">
          Mostrando del {offset + 1} al{" "}
          {offset + currentLength > total ? total : offset + currentLength}
        </li>
      </ul>
    </nav>
  );
}
