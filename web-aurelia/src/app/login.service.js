import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class LoginService {
  static inject() {return [HttpClient];}
  constructor(http) {
    this.http = http;

    this.http.configure(config => {
      config
        .useStandardConfiguration();
    });
  }

  login() {
    return this.http.fetch('login');
  }
}
