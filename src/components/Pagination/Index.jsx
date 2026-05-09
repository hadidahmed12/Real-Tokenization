import ReactPaginate from "react-paginate";

function Paginate({ data, setSkip, skip, limit }) {
  const handlePageClick = (event) => {
    const newOffset = event.selected * limit;
    setSkip(newOffset);
  };

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={Math.ceil(data?.count / limit)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      forcePage={skip / limit}
      breakLinkClassName={"activePagination"}
      activeClassName="activePagination"
    />
  );
}

export default Paginate;
