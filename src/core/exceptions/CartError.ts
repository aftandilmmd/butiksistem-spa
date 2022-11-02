export class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartError';
  }
}

export class CartCouldNotBeRestoredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartCouldNotBeRestoredError';
  }
}

export class CartCouldNotBeRemovedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartCouldNotBeRemovedError';
  }
}
