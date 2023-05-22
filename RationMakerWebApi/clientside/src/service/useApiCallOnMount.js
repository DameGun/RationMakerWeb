import { useEffect, useState } from "react";

const apiStatus = {
  loading: "loading",
  complete: "complete",
  errored: "errored",
};

export const useApiCallOnMount = (service, body) => {
  const [status, setStatus] = useState(apiStatus.loading);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await service(body)
        .then((data) => {
          setData(data);
          setStatus(apiStatus.complete);
        })
        .catch(() => {
          setStatus(apiStatus.errored);
        });
    }
    fetchData();
  }, [body, service, status]);

  return [status === apiStatus.loading, data, status === apiStatus.errored];
};

export const useApiCallSimple = (service) => {
  const [state, setState] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await service()).json();
      setState(data);
    };
    dataFetch();
  }, [service]);

  return { data: state };
};
