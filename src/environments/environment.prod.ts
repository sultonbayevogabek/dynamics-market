export const environment = {
  production: true,
  googleAuthParams: {
    clientId: '2803466287-fq6t97fbmls43nvu29nkhhtioh6tfemv.apps.googleusercontent.com',
    redirectUri: window.location.origin + '/oauth-callback',
    response_type: 'id_token',
    scope: 'email profile openid',
    nonce: '123456789'
  },
  host: 'https://dynamics-market-437742f0667d.herokuapp.com/'
};
