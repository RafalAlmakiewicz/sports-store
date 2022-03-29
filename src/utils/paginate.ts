const paginate = <T>(items: T[], pageSize: number, currentPage: number) => {
  const index = pageSize * (currentPage - 1);
  const page = items.slice(index, index + pageSize);
  return page;
};

export default paginate;
