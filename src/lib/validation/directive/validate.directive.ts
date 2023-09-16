import { Directive, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: 'input[validate], textarea[validate], select[validate]',
})
export class ValidateDirective {
  @Input() controlName?: string; 
  constructor(@Optional() @Self() public ngControl: NgControl) {}
}