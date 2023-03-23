import axios from "axios";
import { useQuery } from "react-query";
import { useFetchData } from "../hooks/useFetchData";

const MoviesRQ = () => {
  const onSuccess = (data) => {
    console.log("fetch succeeded! :) ", data);
  };

  const onError = (error) => {
    console.log("fetch failed! :( ");
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "movies-data",
    () => {
      return axios.get("http://localhost:4000/movies");
    },
    {
      onSuccess: onSuccess,
      onError: onError,
      // enabled: false,
    }
  );

  const { data: cartoons } = useFetchData(
    "cartoons-data",
    "http://localhost:4000/cartoons"
  );

  console.log("cartoons", cartoons);

  return (
    <div>
      <button onClick={refetch}>fetch movies</button>
      {isError ? (
        <h2>{error.message}</h2>
      ) : (
        <div>
          {isLoading ? (
            <div>
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <h2>RQ Movies Page</h2>
              {data?.data.map((item) => {
                return <div>{item.name}</div>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default MoviesRQ;
