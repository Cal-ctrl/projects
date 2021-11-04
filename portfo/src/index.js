import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv"
dotenv.config()


ReactDOM.render(
  <Auth0Provider
  domain={process.env.REACT_APP_AUTHO_DOMAIN}
  clientId={process.env.REACT_APP_AUTHO_CLIENT_ID}
  redirectUri={window.location.origin}
  audience='https://portfo-api-users'>

    <App />
    
    </Auth0Provider>,
  document.getElementById('root')
);