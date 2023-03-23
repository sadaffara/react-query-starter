import { useQuery } from "react-query";
import axios from "axios";

export const useFetchData = (queryKey, url, configs) => {
  return useQuery(
    queryKey,
    () => {
      //this function can also be used outside of the component
      return axios.get(url);
    },
    configs
  );
};
