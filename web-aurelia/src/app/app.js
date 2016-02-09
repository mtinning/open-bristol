export class App {
  configureRouter(config, router) {
    config.title = 'Open Bristol';
    config.map([
      { route: ['','welcome'],  name: 'welcome',  moduleId: './welcome', nav: true, title:'Welcome' },
      { route: 'login-browser', name: 'login-browser',    moduleId: './login-browser', nav: true, title: 'Login (In Browser)'}
    ]);

    this.router = router;
  }
}
