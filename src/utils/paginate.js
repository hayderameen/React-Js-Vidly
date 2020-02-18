import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  console.log("Items in paginate function at start:", items);
  const startIndex = (pageNumber - 1) * pageSize;
  let pageItems;
  if (startIndex + pageSize > items.length) {
    pageItems = items.slice(startIndex, items.length);
  }
  console.log("In Paginate function. StartIndex: ", startIndex);
  console.log("In Paginate function. PageSize: ", pageSize);
  console.log("In Paginate function. pageNumber: ", pageNumber);
  pageItems = items.slice(startIndex, startIndex + pageSize);

  return pageItems;
}
