import React, { useRef } from 'react'

var host = "https://localhost:";
var port = "44352/";
var registerEndpoint = "api/authentication/register";

const RegistrationForm = (props) => {

    const usernameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')

    const submitRegistrationHandler = (event) => {
        event.preventDefault()
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        var requestUrl = host + port + registerEndpoint;
        var sendData = {"email": email, "username": username, "password": password};
        fetch(requestUrl, {method: "POST", headers: {'Content-Type':'application/json'}, body: JSON.stringify(sendData)})
        .then(response => {
            if(response.status === 200){
                console.log("Successful registration");
                alert("Successful registration");
				props.onToggleLoginForm()
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
        <p>Registracija korisnika</p>
        <form onSubmit={submitRegistrationHandler}>
            <label htmlFor="username">Korisnicko ime</label>
            <input id="username" type="text" ref={usernameRef} required /><br />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required /><br />

            <label htmlFor="password">Lozinka</label>
            <input id="password" type="password" ref={passwordRef} required /><br />

            <label htmlFor="confirmPassword">Ponovi lozinku</label>
            <input id="confirmPassword" type="password" ref={confirmPasswordRef} required /><br />

            <button>Registruj se</button><br />
            <button onClick={props.onToggleRegistrationForm}>Odustajanje</button>
        </form>
    </div>
  )
}

export default RegistrationForm