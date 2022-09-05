import React, { useContext } from 'react'

import AuthContext from '../store/auth-context'

const LogoutForm = () => {
    const authCtx = useContext(AuthContext)

  return (
    <form onSubmit={authCtx.logout}>
        <p>Prijavljeni korisnik: {authCtx.username}</p>
        <button>Odjava</button>
    </form>
  )
}

export default LogoutForm