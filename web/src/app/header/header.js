'use strict'

import {Component} from 'angular2/core'

class HeaderComponent {
  constructor() {
    this.title = 'Open Bristol Showcase';
  }
}

export var header = Component({
  selector: 'header',
  templateUrl: '/views/header/header.html',
  styleUrls: ["css/app.css", "css/header/header.css"]
}).Class({ constructor: () => new HeaderComponent()});
