import { useState } from "react";

const useMutation = (promise, { onSuccess, onFail } = {}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const execute = async (...payload) => {
    try {
      setLoading(true);
      const response = await promise(...payload);
      setData(response.data?.data || []);
      onSuccess();
    } catch (error) {
      setError(error);
      onFail(error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, data, loading, error };
};

export default useMutation;
