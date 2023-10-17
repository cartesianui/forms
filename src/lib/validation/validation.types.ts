export const errorTypes = [
  'required',
  'requireRelative',
  'email',
  'minlength',
  'invalidDate',
  'invalidYear',
  'domainName',
  'date',
  'age',
  'inCollection',
  'notInCollection',
  'unicode',
  'float',
  'numeric',
  'whitespace',
  'equalTo',
  'serverError'
] as const;

export type ErrorTypes = (typeof errorTypes)[number];

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => `${formControlName} is required.`,
  requireRelative: (formControlName: string) => `${formControlName} is required.`,
  email: () => `This is not a valid email address.`,
  minlength: (formControlName, requirement) => `${formControlName} should be at least ${requirement} characters.`,
  invalidDate: () => `This is not a valid date.`,
  invalidYear: () => `Date of Birth should be after year 1900.`,
  domainName: (formControlName, message) => message ?? `${formControlName} should be valid domain name`,
  date: (formControlName, message) => message ?? `${formControlName} should be valid date`,
  age: (formControlName, message) => message ?? `${formControlName} should be valid age`,
  inCollection: (formControlName, message) => message ?? `${formControlName} should be in allowed values`,
  notInCollection: (formControlName, message) => message ?? `${formControlName} should be in allowed values`,
  unicode: (formControlName, message) => message ?? `${formControlName} should be valid unicode`,
  float: (formControlName, message) => message ?? `${formControlName} should be number`,
  numeric: (formControlName, message) => message ?? `${formControlName} should be numeric`,
  whitespace: (formControlName, message) => message ?? `${formControlName} not allow use of white space`,
  equalTo: (formControlName, message) => message ?? `${formControlName} value don't match with original field`,
  serverError: (formControlName, message) => message ?? `${formControlName} value is not processable`
};
