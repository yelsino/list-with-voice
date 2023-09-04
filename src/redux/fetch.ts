// const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = import.meta.env.VITE_SOME_KEY
interface Props {
    endpoint: string;
    body?: object;
    method?: string;
}

export const fetchSinToken = async <T>({
    endpoint,
    body,
    method = "GET",
}: Props): Promise<T> => {
    if (method === "GET") {
        const resp = await fetch(endpoint);
        return await resp.json();
    } else {
        const resp = await fetch(endpoint, {
            method,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return await resp.json();
    }
};

export const fetchConToken = async <T>({
    endpoint,
    body,
    method = "GET",
}: Props): Promise<T> => {
    const token = localStorage.getItem("token") || "";

    if (method === "GET") {
        const resp = await fetch(endpoint, {
            headers: {
                Authorization: token,
            },
        });
        return await resp.json();
    } else {
        const resp = await fetch(endpoint, {
            method,
            headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return await resp.json();
    }
};
