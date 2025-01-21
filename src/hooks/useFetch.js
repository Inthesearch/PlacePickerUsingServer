import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [isError, setIsError] = useState();
  const [fetchedData, setFetchData] = useState(initialValue);

  useEffect(() => {
    setIsFetching(true);

    async function fetchData() {
      try {
        setFetchData(await fetchFn());
      } catch (error) {
        setIsError({
          message: error.message || "Currenty not able to fetch data",
        });
        setIsFetching(false);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return { isFetching, fetchedData, isError, setFetchData };
}
