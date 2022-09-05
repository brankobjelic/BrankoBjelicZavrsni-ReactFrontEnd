import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLogged: false,
    username: '',
    login: (token) => {},
    logout: () => {},
    onReceivedUsername: () => {}
})

export const AuthcontextProvider = (props) => {
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState('')

    const userIsLogged = !!token

    const loginHandler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const usernameHandler = (username) => {
        setUsername(username)
    }

    const contextValue = {
        token: token,
        isLogged: userIsLogged,
        username: username,
        login: loginHandler,
        logout: logoutHandler,
        onReceivedUsername: usernameHandler        
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext