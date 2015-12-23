'use strict';

import 'reflect-metadata'

import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app'
import {ApiService} from "./services/api.service"
import {HTTP_PROVIDERS} from "angular2/http"

document.addEventListener('DOMContentLoaded', () => bootstrap(AppComponent, [HTTP_PROVIDERS, ApiService]));
