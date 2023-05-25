import { useQuery } from "react-query";
import axios from "axios";

const MoviesRQ = () => {

  const fetchMovies = ()=>{
    return axios.get("http://localhost:4000/movies");
  }

  const onSuccess = (data) => {
    console.log("fetch succeeded! :) ", data);
  };

  const onError = (error) => {
    console.log("fetch failed! :( ", error);
  };


  const {
      data, 
      isLoading, 
      error, 
      isError,
      refetch,
      } = useQuery(
        'movies-data',
        fetchMovies,
        {
          // refetchInterval: 3000,
          staleTime: 2000,
          onSuccess: onSuccess,
          onError: onError,
          enabled:false,
        }
      )


  return (
    <div>
      {isError ? 
        <h2>{error.message}</h2>
        :
        <div>
          <button
            onClick={refetch}
             >Fetch manually</button>
            {
              isLoading ? 
              <div>
                <h2>Loading...</h2>
              </div>
              :
              <div>
                  <h2>Movies Page React Query</h2>
                {
                  data?.data.map((item)=>(
                    <div>{item.name}</div>
                  ))
                }
              </div>
            }
        </div>}
    </div>
  );
};
export default MoviesRQ;
