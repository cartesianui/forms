export type ErrorTypes =
  | 'required'
  | 'email'
  | 'minlength'
  | 'invalidDate'
  | 'invalidYear'
  | 'whitespace'
  | 'serverError';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => `${formControlName} is required.`,
  email: () => `This is not a valid email address.`,
  minlength: (formControlName, requirement) =>
    `${formControlName} should be at least ${requirement} characters.`,
  invalidDate: () => `This is not a valid date.`,
  invalidYear: () => `Date of Birth should be after year 1900.`,
  whitespace: (formControlName, message) => message ?? `${formControlName} not allow use of white space`,
  serverError: (formControlName, message) => message ?? `${formControlName} value is not process able`
};