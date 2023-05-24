import { useState, useEffect } from "react";
import axios from "axios";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchmovies = () => {
    axios
      .get("http://localhost:4000/movies")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchmovies();
  }, []);

  return (
    <div>
         <h7>Showing list of movies the 'old fashioned' way </h7>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <div>
          {isLoading ? (
            <div>
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <h2>Movies Page</h2>
              {data.map((item) => {
                return <div>{item.name}</div>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
