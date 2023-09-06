import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const PaginatedMovies = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const fetchMovies = (pageNumber) => {
    return axios.get(
      `http://localhost:4000/movies?_limit=5&_page=${pageNumber}`
    );
  };

  const { data, isLoading } = useQuery(
    ["movies-paginated-data", pageNumber],
    () => fetchMovies(pageNumber)
  );
  return (
    <div>
      {isLoading ? (
        <div>
          <h2>Loading Paginated Movies...</h2>
        </div>
      ) : (
        <div>
          <h2>Movies Page React Query</h2>
          {data?.data.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
      <p>
        <span className="fw-bold">Page:</span> {pageNumber}
      </p>
      <p>
        <button
          className="mr"
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </p>
    </div>
  );
};

export default PaginatedMovies;
