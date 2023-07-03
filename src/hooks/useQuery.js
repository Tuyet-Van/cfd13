import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await promise();
      setData(response.data?.data || []);
    } catch (error) {
      setError(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useQuery;
