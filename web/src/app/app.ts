'use strict'

import {Component, View} from 'angular2/core'
import {HeaderComponent} from './header/header'

@Component({
  selector: 'app'
})
@View({
  directives: [HeaderComponent],
  templateUrl: "/views/app.html",
  styleUrls: ["css/app.css"]
})
export class AppComponent {
    public welcome: string;

    constructor() {
      this.welcome = "Welcome to Open Bristol Showcase";
    }
}
