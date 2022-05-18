import React, {useState, useEffect} from 'react'
import {useLocation, withRouter} from 'react-router-dom';

function TokenPage(props) {
    const [id, setID] = useState((useLocation().pathname).replace("/confirm_email/", ""));
    const [message, setMessage] = useState("Temp");
    const submit = (e) => {
        fetch('https://graphtt.herokuapp.com/confirm_email/' + id, {
            method: 'POST',
            body: JSON.stringify({
                'token': id // change here
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.json()).then(msg => login(msg))
    }

    const login = (msg) => {
        setMessage(msg);

        if(msg.status === "Accepted") {
            props.login(msg.email);
            let k = window.location.href;
            let m = k.search("/confirm_email");
            window.location.replace(k.substr(0,m));
        }
    }

    useEffect(() => {
        if(props.loggedIn === true) {
            let k = window.location.href;
            let m = k.search("/confirm_email");
            window.location.replace(k.substr(0,m));
        } else {
            submit();
        }
    }, [])

    return (
        <h1>
            {message.status}
        </h1>
    )
}

export default withRouter(TokenPage)
