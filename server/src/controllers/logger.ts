export namespace Logger {
  export const info = (...message: any[]): void => {
    // tslint:disable-next-line:no-console
    console.info(...message);
  }
  export const error = (...message: any[]): void => {
    // tslint:disable-next-line:no-console
    console.error(...message);
  }
}
