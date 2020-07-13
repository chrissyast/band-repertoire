export function saveRepertoire(changes) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(changes),
        withCredentials: false
    };
    return (
        // todo change host for production
        fetch('http://localhost:3001/api/repertoire/save', requestOptions)
            .then(res => res.json())
            .then(res => {
                return res
                })
            .catch(err => {
                console.log(err)
            })
    )
}