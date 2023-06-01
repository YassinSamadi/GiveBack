import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { OrganizationAuthContextProvider } from './context/authContextOrganizations.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrganizationAuthContextProvider>
        <App />
      </OrganizationAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
