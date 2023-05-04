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
    service()
      .then((data) => {
        setData(data);
        setStatus(status.complete);
      })
      .then(() => {
        setStatus(status.errored);
      });
  }, []);

  return [status === apiStatus.loading, data, status === apiStatus.errored];
};

// export const useApiCallOnMountStatusOnly = (service) => {
//   const [status, setStatus] = useState(apiStatus.loading);

//   useEffect(() => {
//     service().then((response) => {
//       if (response.ok) setStatus(status.complete);
//       else setStatus(status.errored);
//     });
//   }, []);

//   return status;
// };
