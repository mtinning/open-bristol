export class App {
  configureRouter(config, router) {
    config.title = 'Open Bristol';
    config.map([
      { route: ['','welcome'],  name: 'welcome',  moduleId: './welcome', nav: true, title:'Welcome' },
      { route: 'login',         name: 'login',    moduleId: './login', nav: true, title: 'Login'}
    ]);

    this.router = router;
  }
}
