import React from "react";
import { Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";

const BottomPagination = ({
  setCurrentPage,
  totalPage,
  currentPage,
  dispatch,
}) => {
  const handlePagechange = (e, value) => {
    dispatch(setCurrentPage(value));
  };
  const classes = useStyles();

  return (
    <div className={classes.paginationParent}>
      <Pagination
        count={totalPage || 0}
        page={currentPage}
        onChange={handlePagechange}
      />
    </div>
  );
};

export default BottomPagination;

const useStyles = makeStyles({
  paginationParent: {
    "& .MuiPaginationItem-root": {
      color: "#c6c6c6",
      fontFamily: "Poppins, sans-serif",
    },
  },
});
