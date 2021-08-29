import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';



export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },
          // If set a false you cannot get any information about the user example the username
          // if you use keycloakService.getUserName() you get this error
          // User not logged in or user profile was not loaded.
          // loadUserProfileAtStartUp: true,
          initOptions: {
            //   This is an action we specified on keycloak load
            //   We have two options : 'login-required'|'check-sso'
            //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.
            //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
            //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
            // <html>
            //    <body>
            //         <script>
            //           parent.postMessage(location.href, location.origin);
            //         </script>
            //      </body>
            // </html>
            onLoad: 'login-required',
            checkLoginIframe: false,
            // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },
          // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
          // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['/assets', '/clients/public']
        })
        const keycloakAuth = keycloak.getKeycloakInstance();
        keycloakAuth;

        keycloakAuth.updateToken(3000);
        
        localStorage.setItem("token", keycloakAuth.token || '');
        localStorage.setItem("refresh-token", keycloakAuth.refreshToken || '');

      

        
        keycloakAuth.onTokenExpired = () => {
          if (keycloakAuth.refreshToken) {
            setTimeout(() => {
              keycloakAuth.updateToken(60).then((refreshed) => {
                if(refreshed) {
                  console.log('Token refreshed' + refreshed);
                  localStorage.setItem("token", keycloakAuth.token || '');
        localStorage.setItem("refresh-token", keycloakAuth.refreshToken || '');
                }else{
                }
              }).catch(() => {
                 console.error('Failed to refresh token');
              });
           }, 40000)
            
          } else {
            keycloakAuth.login();
          }
        }
      
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}