import { useMemo, useState } from "react";
import "./Tabla.css";

export default function Tabla({ comments }) {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleRows, setVisibleRows] = useState([]);

  useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setVisibleRows(comments.slice(startIndex, endIndex));
  }, [comments, currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(comments.length / pageSize)) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div id="tabla-comentarios">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Comentario</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {visibleRows.map((comment) => (
              <tr key={comment.id}>
                <th scope="row">{comment.id}</th>
                <td>{comment.name}</td>
                <td>{comment.message}</td>
                <td>{new Date(comment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <nav aria-label="Pagination">
          <ul className="pagination">
            <li
              className="page-item"
              onClick={() => handlePageChange("previous")}
            >
              <p className="page-link">Previous</p>
            </li>
            <li className="page-item" onClick={() => handlePageChange("next")}>
              <p className="page-link">Next</p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
