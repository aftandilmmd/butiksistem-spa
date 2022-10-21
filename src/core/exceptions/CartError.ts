export class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartError';
  }
}
