import React, { useState } from 'react'

const AccountMenu = (props) => {


  return (
    <div>
        <p>Korisnik nije prijavljen na sistem</p>
        <button onClick={props.onToggleRegistrationForm}>Registracija</button><br />
        <button onClick={props.onToggleLoginForm}>Prijava</button>
    </div>
  )
}

export default AccountMenu