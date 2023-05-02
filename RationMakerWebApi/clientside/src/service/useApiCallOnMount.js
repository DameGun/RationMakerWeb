import {useEffect, useState} from "react";

const apiStatus = {
    loading: 'loading',
    complete: 'complete',
    errored: 'errored'
}

const useApiCallOnMount = (service) => {
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
            })
    }, [])
    
    return [status === apiStatus.loading, data, status === apiStatus.errored];
}
export default useApiCallOnMount;