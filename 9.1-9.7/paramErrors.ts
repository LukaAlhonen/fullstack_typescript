export class MalformattedParameterError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "MalformattedParameterError";
    Object.setPrototypeOf(this, MalformattedParameterError.prototype);
  }
}

export class MissingParameterError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "MissingParameterError";
    Object.setPrototypeOf(this, MalformattedParameterError.prototype);
  }
}
