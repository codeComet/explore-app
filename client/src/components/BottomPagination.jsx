import React from "react";
import { Pagination } from "@mui/material";

const BottomPagination = ({
  setCurrentPage,
  totalPage,
  currentPage,
  dispatch,
}) => {
  const handlePagechange = (e, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <div>
      <Pagination
        count={totalPage || 0}
        page={currentPage}
        onChange={handlePagechange}
      />
    </div>
  );
};

export default BottomPagination;
