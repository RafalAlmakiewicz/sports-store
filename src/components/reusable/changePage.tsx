interface ChangePageProps {
  pageCount: number;
  currentPage: number;
  handleChange: (page: number) => React.MouseEventHandler<HTMLButtonElement>;
}

const ChangePage = ({
  pageCount,
  currentPage,
  handleChange,
}: ChangePageProps) => {
  const previousPageButton = (
    <button onClick={handleChange(currentPage - 1)}>&lt;</button>
  );
  const nextPageButton = (
    <button onClick={handleChange(currentPage + 1)}>&gt;</button>
  );
  const nthPageButtons = [...Array(pageCount)].map((_, i) => (
    <button
      key={i}
      className={i + 1 === currentPage ? "selected" : undefined}
      onClick={handleChange(i + 1)}
    >
      {i + 1}
    </button>
  ));

  return (
    <div>
      {pageCount > 1 && currentPage !== 1 && previousPageButton}
      {pageCount > 1 && nthPageButtons}
      {pageCount > 1 && currentPage !== pageCount && nextPageButton}
    </div>
  );
};

export default ChangePage;
