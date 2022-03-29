import styles from "./changePage.module.scss";

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
    <button className={styles.arrow} onClick={handleChange(currentPage - 1)}>
      &lt;
    </button>
  );
  const nextPageButton = (
    <button className={styles.arrow} onClick={handleChange(currentPage + 1)}>
      &gt;
    </button>
  );
  const nthPageButtons = [...Array(pageCount)].map((_, i) => (
    <button
      key={i}
      className={i + 1 === currentPage ? styles.active : undefined}
      onClick={handleChange(i + 1)}
    >
      {i + 1}
    </button>
  ));

  return (
    <div className={`${styles.changePage}`}>
      {pageCount > 1 && currentPage !== 1 && previousPageButton}
      {nthPageButtons}
      {pageCount > 1 && currentPage !== pageCount && nextPageButton}
    </div>
  );
};

export default ChangePage;
