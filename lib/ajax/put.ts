export default function put(url: string, data: any) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}