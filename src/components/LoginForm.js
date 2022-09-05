import React, { useRef, useContext } from 'react'

import AuthContext from '../store/auth-context'

var host = "https://localhost:";
var port = "44352/";
var loginEndpoint = "api/authentication/login";

const LoginForm = (props) => {

    const usernameRef = useRef('')
    const passwordRef = useRef('')

    const authCtx = useContext(AuthContext)

    const submitLoginHandler = (event) => {
        event.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        var requestUrl = host + port + loginEndpoint;
        var sendData = {"username": username, "password": password};
        fetch(requestUrl, {method: "POST", headers: {'Content-Type':'application/json'}, body: JSON.stringify(sendData)})
        .then(response => {
            if(response.status === 200){
                console.log("Successful login");
                alert("Successful login");
                response.json().then((data) => {
                    console.log(data);
                    authCtx.login(data.token)
                    authCtx.onReceivedUsername(data.username)
                    props.onToggleLoginForm()             
                });
            }else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
        })
        .catch(error => console.log(error));
    }

  return (
    <div>
    <p>Prijava korisnika</p>
    <form onSubmit={submitLoginHandler}>
        <label htmlFor="username">Korisnicko ime</label>
        <input id="userName" type="text" ref={usernameRef} required /><br />

        <label htmlFor="password">Lozinka</label>
        <input id="password" type="password" ref={passwordRef} required /><br />

        <button>Prijavi se</button><br />
        <button onClick={props.onToggleLoginForm}>Odustajanje</button>
    </form>
</div>
  )
}

export default LoginForm