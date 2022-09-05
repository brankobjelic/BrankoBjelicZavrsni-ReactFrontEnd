import { useState, useContext } from "react"

import AccountMenu from "./components/AccountMenu";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Ads from './components/Ads'
import AuthContext from './store/auth-context'


function App() {
  const authCtx = useContext(AuthContext)

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(prev => !prev)
  }

  const toggleLoginForm = () => {
    setShowRegistrationForm(false)
    setShowLoginForm(prev => !prev)
  }

  return (
    <div>
      { !authCtx.isLogged  && !showRegistrationForm && !showLoginForm  && <AccountMenu onToggleRegistrationForm={toggleRegistrationForm} onToggleLoginForm={toggleLoginForm} />}
      { !authCtx.isLogged && showRegistrationForm && <RegistrationForm  onToggleRegistrationForm={toggleRegistrationForm} onToggleLoginForm={toggleLoginForm} />}
      { !authCtx.isLogged && showLoginForm && <LoginForm onToggleLoginForm={toggleLoginForm} />}
      { authCtx.isLogged && <LogoutForm  />}
      <Ads />
    </div>
  );
}

export default App;
