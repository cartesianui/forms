import { Injectable } from '@angular/core';
import { ErrorTypes, ERROR_MESSAGES } from './validation.types';
import { AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  getErrorValidationMessage(formControlName: string, errors: [string, any][]): string {
    switch (true) {
      case this.checkErrorType(errors, 'required'):
        return ERROR_MESSAGES['required'](formControlName);
      case this.checkErrorType(errors, 'invalidYear'):
        return ERROR_MESSAGES['invalidYear']();
      case this.checkErrorType(errors, 'invalidDate'):
        return ERROR_MESSAGES['invalidDate']();

      case this.checkErrorType(errors, 'email'):
        return ERROR_MESSAGES['email']();

      case this.checkErrorType(errors, 'whitespace'):
        return ERROR_MESSAGES['whitespace'](formControlName, this.getErrorMessage(errors, 'whitespace'));
      
      case this.checkErrorType(errors, 'serverError'):
        return ERROR_MESSAGES['serverError'](formControlName, this.getErrorMessage(errors, 'serverError'));

      case this.checkErrorType(errors, 'minlength'):
        const minRequirement = this.getErrorMessage(errors, 'minlength')?.requiredLength;
        return ERROR_MESSAGES['minlength'](formControlName, minRequirement);

      default:
        return 'Some Error';
    }
  }

  checkErrorType(errors: [string, any][], key: ErrorTypes) {
    return errors.some(([errorKey, value]) => errorKey === key);
  }

  getErrorMessage(errors: [string, any][], key: ErrorTypes) {
    return errors.find(([k, v]) => k === key)?.[1];
  }

   /**
   *
   * @param e Element with the objects containing errors.
   * @returns Error message as string.
   * 
   * NOTE: This need to be replaced where-ever used
   * 
   */

    getErrorMessageOld(e: any): string {
      const key = Object.keys(e)[0];
      if (key === 'required') {
        return 'This field is required!';
      } else if (key === 'minlength') {
        return 'This field requires at least ' + e[key].requiredLength + ' characters.';
      } else if (key === 'maxlength') {
        return `This field can't have more than ` + e[key].requiredLength + `characters.`;
      } else {
        return e[key].value;
      }
    }

  /**
   * Validates email
   */
  emailValidator(): ValidatorFn {
    const regEx = new RegExp(String.raw`^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$`);
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regEx.test(control.value);
      return valid ? null : { email: { value: 'Invalid email pattern!' } };
    };
  }

  /**
   * Validates Domain Name
   */
  domainValidator(): ValidatorFn {
    const regEx = new RegExp(String.raw`^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$`);
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regEx.test(control.value);
      return valid ? null : { domain: { value: 'Invalid domain pattern!' } };
    };
  }

  /**
   * Validates gender. Accepts Male and Female (case sensitive).
   */
  genderValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control?.value?.toLowerCase() === 'male' || control?.value?.toLowerCase() === 'female';
      return valid ? null : { gender: { value: 'Gender must be either male or female!' } };
    };
  }

  /**
   * Validates truefalse. Accepts True and False (case sensitive).
   */
  trueFalseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value === 'true' || control.value === 'false';
      return valid ? null : { gender: { value: 'Must be either enable or disable!' } };
    };
  }

  /**
   * Validates activeDeactive. Accepts active and deactive (case sensitive).
   */
  activeDeactiveValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value === 'active' || control.value === 'deactive';
      return valid ? null : { gender: { value: 'Must be either active or deactive!' } };
    };
  }

  /**
   * Verifies that the date is in correct format.
   */
  dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = Date.parse(control.value);
      return valid ? null : { date: { value: 'The date entered is invalid!' } };
    };
  }

  /**
   * Validates if date of birth meets age requirement
   * @param minAge Minimum age (inclusive)
   */
  dobValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const age = this.getAge(control.value);
      const valid = age >= minAge;
      return valid ? null : { dob: { value: 'You need to be at least 12 years old.' } };
    };
  }

  /**
   *
   * @param values Array of values to look in
   * @returns true if control value is in the given array, false otherwise
   */
  inValidator(validValues: any[], multiple: boolean = false, separator: string = ','): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let valid = null;
      if (multiple) {
        let values = control.value && typeof control.value === 'string' ? control.value.split(separator) : control.value;
        valid = values.length ? values.every((value) => validValues.indexOf(value) !== -1) : true;
      } else {
        valid = validValues.indexOf(control.value) !== -1;
      }
      return valid ? null : { value: { value: 'Invalid value.' } };
    };
  }

  /**
   *
   * @param values Array of values to look in
   * @returns true if control value is not in the given array, false otherwise
   */
  notInValidator(values: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = values.indexOf(control.value) === -1;
      return valid ? null : { value: { value: 'Invalid value.' } };
    };
  }

  /**
   * Validates float value
   * @returns true if control value is a float
   */
  isFloatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp(String.raw`^\d+(\.\d+){0,1}$`);
      const valid = regex.test(control.value);
      return valid ? null : { value: { value: 'Data must be a number.' } };
    };
  }

  /**
   * Validates space separated unicodes
   */
  unicodeValidator(): ValidatorFn {
    const regEx = new RegExp(String.raw`^(U\+[A-F1-9]{1,6})+( U\+[A-F1-9]{1,6})*$`);
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regEx.test(control.value);
      return valid ? null : { email: { value: 'Invalid unicode pattern!' } };
    };
  }

  /**
   * Validates a confirm password control by matching it with value of control with the given name
   * @param passwordFieldName Name of the password control to match with
   */
  confirmPasswordValidator(passwordFieldName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.parent) {
        // Formgroup not yet initialized
        return null;
      }
      const passwordField = control.parent.controls[passwordFieldName];
      const valid = control.value === passwordField.value;
      return valid ? null : { value: { value: 'Passwords do not match!' } };
    };
  }

  // Helpers
  /**
   *
   * @param control The AbstractControl to test for validity.
   * @returns String with classes for invalid, valid or default form.
   */
  getFormClasses = (control: AbstractControl): string => {
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
    return '';
  };

  // Private helpers
  /**
   *
   * @param dob The date string to compare with current date for age.
   * @returns Number representing the age.
   */
  getAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

    /**
   * Validates email address
   *
   * @param formControl
   */
     public validateEmail(formControl: FormControl): { [error: string]: any } {
      let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return EMAIL_REGEXP.test(formControl.value) ? null : { validateEmail: { valid: false } };
    }
  
    /**
     * Validates required numeric values
     *
     * @param formControl
     */
    public numericRequired(formControl: FormControl): { [error: string]: any } {
      return formControl.value && formControl.value > 0 ? null : { numericRequired: { valid: false } };
    }
  
    /**
     * Validates matching string values
     *
     * @param controlKey
     * @param matchingControlKey
     */
    public matchingPasswords(controlKey: string, matchingControlKey: string): { [error: string]: any } {
      return (group: FormGroup): { [key: string]: any } => {
        if (group.controls[controlKey].value !== group.controls[matchingControlKey].value) {
          return { mismatch: { valid: false } };
        }
      };
    }
}
