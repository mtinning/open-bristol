"use strict";

import {Inject} from "angular2/core"
import {Http} from "angular2/http"
import "rxjs/add/operator/map"

export class ApiService {
  private _http : Http;
  private _root : string;

  constructor(@Inject(Http) http:Http) {
    this._http = http;
    this._root = 'http://localhost:50353/api/';
  }

  apiRequest(request:string, onSuccess) {
    this._http.get(this._root + request)
      .map(res => res.text())
      .subscribe(
        data => onSuccess(data),
        err => console.error("Error: " + err),
        () => console.log("API Request Complete")
      );
  }
}
