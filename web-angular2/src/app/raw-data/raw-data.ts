"use strict"

import {ApiService} from "../services/api.service"
import {Inject, Component} from "angular2/core"
import {bootstrap} from "angular2/platform/browser"

@Component({
  selector: "raw-data",
  templateUrl: "views/raw-data/raw-data.html",
  styleUrls: ["css/app.css"]
})
export class RawData {
  private _apiService : ApiService;

  message = "No response yet";

  constructor(@Inject(ApiService) apiService:ApiService) {
    apiService.apiRequest("Hello from the app!", data => this.message = data );
  }
}
