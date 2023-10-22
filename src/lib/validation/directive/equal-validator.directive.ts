import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValidator),
      multi: true
    }
  ]
})
export class EqualValidator implements Validator {
  constructor(
    @Attribute('equalTo') public equalTo: string,
    @Attribute('reverse') public reverse: string,
  ) {}

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }

  validate(control: AbstractControl): { [key: string]: any } {
    // self value
    const value = control.value;

    // second control
    const control2 = control.root.get(this.equalTo);

    // value not equal
    if (control2 && value !== control2.value && !this.isReverse) {
      return {
        equalTo: `Value don't match`
      };
    }

    // value equal and reverse
    if (control2 && value === control2.value && this.isReverse) {
      delete control2.errors.equalTo;
      if (!Object.keys(control2.errors).length) {
        control2.setErrors(null);
      }
    }

    // value not equal and reverse
    if (control2 && value !== control2.value && this.isReverse) {
      control2.setErrors({ equalTo: `Value don't match`});
    }

    return null;
  }
}
