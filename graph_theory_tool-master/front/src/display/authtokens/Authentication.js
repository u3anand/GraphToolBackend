/* import React, {useEffect, useState} from 'react'
export default function Authentication() {
    const [submitBool, setSubmitBool] = useState(false);
    const [email, setEmail] = useState();

    useEffect(() => {
        fetch('/login').then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => console.log(data))
    }, [submitBool])

    const submit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                'email': email // change here
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.json()).then(message => console.log(message))
    }

    return (
        <div>
            <form action="/api" onSubmit={submit} method="post">
                <label for="email">Email:</label>
                <input id="email" name="email" onChange={(e) => setEmail(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
*/