'use strict'

import {Component} from 'angular2/core'

@Component({
  selector: 'header',
  templateUrl: '/views/header/header.html',
  styleUrls: ["css/app.css", "css/header/header.css"]
})
export class HeaderComponent {
  public title: string;

  constructor() {
    this.title = 'Open Bristol Showcase';
  }
}
