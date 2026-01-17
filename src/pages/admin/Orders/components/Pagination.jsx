function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  if (pages.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-primary)",
        }}
      >
        <i className="fa-solid fa-chevron-left text-xs"></i>
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 flex items-center justify-center text-xs font-bold tracking-widest transition-all duration-300 ${page === currentPage
              ? "bg-black text-white"
              : "border hover:bg-gray-50 text-gray-400"
            }`}
          style={{
            borderColor: page === currentPage ? "black" : "var(--color-border)",
            fontFamily: "var(--font-body)",
          }}
        >
          {page.toString().padStart(2, "0")}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(pages.length, p + 1))}
        disabled={currentPage === pages.length}
        className="w-10 h-10 flex items-center justify-center border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-primary)",
        }}
      >
        <i className="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
}

export default Pagination;
