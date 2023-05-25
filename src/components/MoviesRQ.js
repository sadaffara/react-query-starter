import { useQuery } from "react-query";
import axios from "axios";

const MoviesRQ = () => {

  const fetchMovies = ()=>{
    return axios.get("http://localhost:4000/movies");
  }

  const {data, isLoading}= useQuery(
    'movies-data',
    fetchMovies,
  )


  return (
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
    </div>
  );
};
export default MoviesRQ;
