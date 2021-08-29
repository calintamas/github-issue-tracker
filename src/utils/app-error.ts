class AppError extends Error {
  static defaultMessage = 'Something went wrong';

  /*
    App-specific error code.

    Format: GH-$NUMBER
    Example: GH-1002
   */
  code: string;

  constructor(code: number, message: string = AppError.defaultMessage) {
    super();
    this.name = 'AppError';
    this.message = message;
    this.code = `GH-${code}`;
  }
}

export { AppError };
