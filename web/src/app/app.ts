'use strict'

import {Component, View, Inject, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core'
import {HeaderComponent} from './header/header'
import {RawData} from "./raw-data/raw-data"
import {ApiService} from "./services/api.service"

@Component({
  selector: 'app'
})
@View({
  directives: [HeaderComponent, RawData],
  templateUrl: "/views/app.html",
  styleUrls: ["css/app.css"]
})
export class AppComponent {
    public welcome: string;

    constructor(@Inject(ApiService) apiService:ApiService) {
      this.welcome = "Welcome to Open Bristol Showcase";
    }
}
