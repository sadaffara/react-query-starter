import { useQuery } from "react-query";
import axios from "axios";

const MoviesRQ = () => {

  const fetchMovies = ()=>{
    return axios.get("http://localhost:4000/movies");
  }

  const {data, isLoading, error, isError}= useQuery(
    'movies-data',
    fetchMovies,
  )


  return (
    <div>
      {isError ? 
        <h2>{error.message}</h2>
        :
        <div>
            {
              isLoading ? 
              <div>
                <h2>Loading...</h2>
              </div>
              :
              <div>
                  <h2>Movies Page React Query</h2>
                {
                  data.data.map((item)=>(
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
