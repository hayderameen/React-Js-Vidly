import React from "react";
import _ from "lodash";
import PropTypes, { array } from "prop-types";
import { number } from "prop-types";
import { func } from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = itemsCount / pageSize;
  const pages = _.range(1, pageCount + 1);

  if (pageCount <= 1) return null;
  return (
    <nav>
      <ul
        style={{ cursor: "pointer" }}
        className="pagination justify-content-end"
      >
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
