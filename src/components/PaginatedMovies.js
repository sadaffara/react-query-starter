import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const PaginatedMovies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchMovies = (pageNumber, limit) => {
    return axios.get(
      `http://localhost:4000/movies?_limit=${limit}&_page=${pageNumber}`
    );
  };

  const { data, isLoading } = useQuery(
    ["movies-paginated-data", pageNumber, limit],
    () => fetchMovies(pageNumber, limit),
    {
      keepPreviousData: true,
    }
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
            <div key={item.id}>
              <span className="fw-bold mr">{item.id}.</span>
              {item.name}
            </div>
          ))}
        </div>
      )}

      <div className="mt">
        <div className="mb">
          <span className="fw-bold">Show per page: </span>
          <span>{limit}</span>
        </div>
        <button className="mr" onClick={() => setLimit(2)}>
          2
        </button>
        <button className="mr" onClick={() => setLimit(5)}>
          5
        </button>
        <button className="mr" onClick={() => setLimit(10)}>
          10
        </button>
      </div>
      <div className="mt">
        <span className="fw-bold">Page:</span> {pageNumber}
      </div>
      <div className="mt">
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
      </div>
    </div>
  );
};

export default PaginatedMovies;
