export function saveRepertoire(changes) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(changes),
        withCredentials: false
    };
    const host = process.env.NODE_SERVER || 'http://localhost:4000'
    return (
        // todo change host for production
        fetch(`${host}/api/repertoire/save`, requestOptions)
            .then(res => res.json())
            .then(res => {
                return res
                })
            .catch(err => {
                console.log(err)
            })
    )
}