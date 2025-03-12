import React, { useEffect, useState } from 'react';
import keycloak from './keycloak';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  
  useEffect(() => {
    // 1. Intentar login silencioso
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false
      })
      .then(auth => {
        if (auth) {
          setAuthenticated(true);
          setToken(keycloak.token);
          callApi(keycloak.token);
        } else {
          // 2. Si no está autenticado, redirigir al login (interactivo)
          keycloak.login();
        }
        setChecked(true);
      })
      .catch(error => {
        console.error('Error en init de Keycloak', error);
      });
  }, []);

  const callApi = (accessToken) => {
    fetch('http://localhost:8080/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.text())
      .then(setApiResponse)
      .catch(err => {
        console.error('Error al llamar a la API', err);
        setApiResponse('Error al llamar a la API');
      });
  };

  if (!authenticated) return <p>Verificando sesión...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>bps-admin-app</h1>
      <p>Usuario: {keycloak.tokenParsed?.preferred_username}</p>
      <p><strong>Token:</strong></p>
      <pre>{token}</pre>

      <hr />

      <h2>Respuesta desde la API Java:</h2>
      <pre>{apiResponse || 'Esperando respuesta...'}</pre>

      <button onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
