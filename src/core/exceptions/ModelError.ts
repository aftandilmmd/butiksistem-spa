export class ModelNotFound extends Error {
  constructor(message = 'Model not found!') {
    super(message);
    this.name = 'ModelNotFound';
  }
}
