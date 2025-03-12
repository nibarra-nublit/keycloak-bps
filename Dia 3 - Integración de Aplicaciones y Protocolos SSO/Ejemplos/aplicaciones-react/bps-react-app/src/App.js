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

  if (!checked) return <div>Verificando sesión...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>bps-react-app</h1>
      {authenticated ? (
        <>
          <p>Autenticado como: {keycloak.tokenParsed?.preferred_username}</p>
          <pre>{keycloak.token}</pre>

          <h2>Respuesta desde la API Java:</h2>
          <pre>{apiResponse || 'Esperando respuesta...'}</pre>

          <button onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No autenticado</p> // nunca debería verse esto en este flujo
      )}
    </div>
  );
}

export default App;
