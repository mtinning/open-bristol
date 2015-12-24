import {HttpClient} from 'aurelia-fetch-client';
import {LoginService} from './login.service';
import 'fetch';

export class Login {
  static inject() { return [HttpClient, LoginService]; }

  constructor(http, loginService) {
    this.http = http;

    this.loginService = loginService;

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults( {
          headers: {
            'Content-Type': 'application/octet-stream; charset=utf-8'
          }
        });
    });
  }

  onSuccess(http, loginService) {
    return googleUser => {
      console.log("Logged in as: " + googleUser.getBasicProfile().getName());

      loginService.login().then(response => response.text()).then(sessionId => {
        http.fetch('gconnect/' + sessionId, {
          method: 'post',
          body: googleUser.getAuthResponse()
        }).then(response => response.text() )
        .then(result => {
          if (result == "true") alert("Login successful!")
          else alert("Login failed!")
        });
      });
    }
  }

  attached() {
    var onFailure = error => console.error("Error accessing google api: " + error);
    gapi.load('auth2', () => {
      gapi.auth2.init({
        'scope': 'openid email',
        'client_id': '330702203967-1e3dllkoa3bhun0j4gir9aushb9k2abo.apps.googleusercontent.com',
        'cookie_policy': 'none',
        'approvalprompt': 'force',
      });
      gapi.signin2.render('my-signin2', {
        'redirect_uri': 'postmessage',
        'access_type': 'offline',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess(this.http, this.loginService),
        'onfailure': onFailure
      });
    });
  }
}
