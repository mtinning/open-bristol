'use strict'

import {Component} from 'angular2/core'
import {header} from 'header/header'

class AppComponent {
    constructor() {
      this.welcome = "Welcome to Open Bristol Showcase";
    }
}

export var app = Component({
  selector: 'app'
}).View({
  directives: [header],
  templateUrl: "/views/app.html",
  styleUrls: ["css/app.css"]
}).Class({ constructor: () => new AppComponent() });
