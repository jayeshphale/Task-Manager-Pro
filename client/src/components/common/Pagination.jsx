const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-12 flex-wrap">

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (

        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-12 h-12 rounded-2xl font-semibold transition ${
            currentPage === page
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "bg-white dark:bg-gray-800 hover:scale-105"
          }`}
        >
          {page}
        </button>

      ))}

    </div>
  );
};

export default Pagination;