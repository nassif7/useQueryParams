import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getValue = (values: string[], $default: string = "") =>
  values[0] ?? $default;
const getParams = (params: Record<string, string[]>, key: string) =>
  params[key] ?? [];
const getParam = (
  params: Record<string, string[]>,
  key: string,
  $default: string = ""
) => getValue(getParams(params, key), $default);

const useQueryParams = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  return useMemo(() => {
    const params: URLSearchParams = new URLSearchParams(search);

    const index = Array.from(params.keys()).reduce(
      (o, key) => ({ ...o, [key]: params.getAll(key) }),
      {} as Record<string, string[]>
    );
    return {
      params,
      index,
      getAll: (key: string) => getParams(index, key),
      getOne: (key: string, $default: string = "") =>
        getParam(index, key, $default),
      commit: (params: URLSearchParams) =>
        navigate(`?${params.toString()}`, { replace: true })
    };
  }, [navigate, search]);
};

export default useQueryParams;
