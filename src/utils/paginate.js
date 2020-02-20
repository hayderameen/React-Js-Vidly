import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  let pageItems;
  if (startIndex + pageSize > items.length) {
    pageItems = items.slice(startIndex, items.length);
  }

  pageItems = items.slice(startIndex, startIndex + pageSize);

  return pageItems;
}
