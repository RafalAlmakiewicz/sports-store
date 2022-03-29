const getPageCount = (itemsCount: number, pageSize: number) =>
  Math.ceil(itemsCount / pageSize);

export default getPageCount;
