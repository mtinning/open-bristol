export class Welcome {
  constructor() {
    this.heading = "Welcome to Aurelia!";
    this.firstName = "John";
    this.lastName = "Doe";
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    alert(`Welcome, ${this.fullName}!`);
  }
}
