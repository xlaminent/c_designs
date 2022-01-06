import { useState, useRef, useEffect } from "react";

export default function useFetchAll(urls) {
    const previousUrlsRef = useRef([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (compareLists(previousUrlsRef.current, urls)) {
            setLoading(false);
            return;
        } 

        previousUrlsRef.current = urls;

        const promises = urls.map((url) =>
            fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
        );

        Promise.all(promises)
            .then((json) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    return { data, loading, error };
}

function compareLists(list, list2) {
    return (
        list.length === list2.length && list.every((value, i) => value === list2[i])
    );
}

