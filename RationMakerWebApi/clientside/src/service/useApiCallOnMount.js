import { useEffect, useState } from "react";

const apiStatus = {
  loading: "loading",
  complete: "complete",
  errored: "errored",
};

export const useApiCallOnMount = (service) => {
  const [status, setStatus] = useState(apiStatus.loading);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await service()
        .then((data) => {
          setData(data);
          setStatus(apiStatus.complete);
        })
        .catch(() => {
          setStatus(apiStatus.errored);
        });
    }
    fetchData();
  }, [service, status]);

  return [status === apiStatus.loading, data, status === apiStatus.errored];
};

// export const useApiCallOnMountStatusOnly = (service, data) => {
//   const [status, setStatus] = useState(apiStatus.loading);

//   useEffect(() => {
//     service(data).then((response) => {
//       if (response.ok) setStatus(status.complete);
//       else setStatus(status.errored);
//     });
//   }, []);

//   return status;
// };
