import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[noWhiteSpace]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NoWhiteSpaceValidator),
      multi: true
    }
  ]
})
export class NoWhiteSpaceValidator implements Validator {
  constructor(@Attribute('noWhiteSpace') public noWhiteSpace: string) {}

  validate(control: AbstractControl): { [key: string]: any } {
    return /\s/g.test(control.value) ? { whitespace: `This field do not allow white spaces` } : null;
  }
}
