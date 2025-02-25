import { useCallback, useEffect, useState } from "react";
import { Debt } from "../model/Debt";
import { getDebts } from "../services/debt-service";

const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const errorResponse = "Attempt to query debts failed.";

  const fetchDebts = useCallback(async () => {
    try {
      setError("");
      setLoader(true);

      const response = await getDebts();

      if (!response?.data) {
        throw new Error(errorResponse);
      }
      console.log(
        `Debt query successful. ${response.data.length} debts retrieved`
      );
      setDebts(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || errorResponse);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  return { debts, error, isLoading, refresh: fetchDebts };
};

export default useDebts;
