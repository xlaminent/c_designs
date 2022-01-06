const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function saveOrder(address) {
    return fetch(baseUrl + "order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    });
}
