import {useCallback, useEffect, useState} from "react";

const useFetch = (service) => {
    const [result, setResult] = useState([]);
    useEffect(async () => {
        try {
            const data = await fetch("http://localhost:8000" + service.endpoint);
            setResult(data);
        } catch (error) {
            // Handle errors if necessary
            console.error("Error fetching data:", error);
        }

    }, [service]);

    return [result, setResult];
}

export default useFetch;
