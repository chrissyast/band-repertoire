export function doSomething() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('/something', requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            })
        .catch(err => {
            console.log(err)
        })
}