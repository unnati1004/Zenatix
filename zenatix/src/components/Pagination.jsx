import "../style/Pagination.css"
export default function Pagination({ gotoNextPage, gotoPrevPage }) {
    return (
      <div className="paginate">
        {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
      </div>
    )
}