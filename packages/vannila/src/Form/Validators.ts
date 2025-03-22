export class Validators {
  static pattern(regex: RegExp, error: string) {
    return (value: string | number) => (regex.test(String(value)) ? "" : error);
  }

  static required(error: string) {
    return (value: string | number) =>
      value === "" || value === undefined || value === null ? error : "";
  }

  static equal(inputValue: string | number | boolean, error: string) {
    return (value: string | number) => (value !== inputValue ? error : "");
  }

  static min(minValue: number, error: string) {
    return (value: number) => (value < minValue ? error : "");
  }

  static max(maxValue: number, error: string) {
    return (value: number) => (value > maxValue ? error : "");
  }

  static minLength(minLength: number, error: string) {
    return (value: string) => (value.length < minLength ? error : "");
  }

  static maxLength(maxLength: number, error: string) {
    return (value: string) => (value.length > maxLength ? error : "");
  }

  static alpha(error: string) {
    return (value: string) => (/a-zA-Z/.test(value) ? "" : error);
  }

  static numeric(error: string) {
    return (value: string) => (/0-9/.test(value) ? "" : error);
  }

  static alphaNumeric(error: string) {
    return (value: string) => (/a-zA-Z0-9/.test(value) ? "" : error);
  }
}
