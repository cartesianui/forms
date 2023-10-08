import { Component, ContentChild, OnInit } from '@angular/core';
import { ValidateDirective } from '../directive/validate.directive';
import { ValidationService } from '../validation.service';
import { HttpNotificationService, IError } from '@cartesianui/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'with-validation',
  templateUrl: './with-validation.component.html',
  styleUrls: ['./with-validation.component.scss']
})
export class WithValidationComponent implements OnInit {
  @ContentChild(ValidateDirective, { static: true }) validateDirective!: ValidateDirective;

  constructor(
    private validationOberverService: ValidationService,
    private errorService: HttpNotificationService
  ) {}

  ngOnInit() {
    if (!this.validateDirective) {
      throw new Error('Without validate directive <with-validation></with-validation> is a useless component!');
    }
    this.errorService.serverErrors$.subscribe((errors) => this.setServerError(errors, this.validateDirective));
  }

  get errorMessage(): string | null {
    const errors = Object.entries(this.validateDirective?.ngControl?.control?.errors || {});

    if (!this.validateDirective?.ngControl?.dirty && !this.validateDirective?.ngControl?.touched) return '';
    if (!errors.length) {
      return null;
    }

    const passedControlName = this.validateDirective?.controlName;
    const formControlName = passedControlName ?? (this.validateDirective?.ngControl?.name as string) ?? 'This Field';
    return this.validationOberverService.getErrorValidationMessage(this.humanReadable(formControlName), errors);
  }

  setServerError(errors: IError, validateDirective) {
    const fieldErrors = errors[validateDirective?.ngControl?.name];
    if (fieldErrors) {
      validateDirective?.ngControl?.control?.setErrors({ serverError: fieldErrors.concat('\n') } as ValidationErrors);
    }
  }

  humanReadable(name: string) {
    // camel case to space separated words
    const separatedWords = name.replace(/(?<=[a-zA-Z])(?=[A-Z])/g, ' ');

    const words = separatedWords.split(' ');

    const capitalizedWords = words.map((word, i) => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    const humanReadableText = capitalizedWords.join(' ');

    return humanReadableText;
  }
}
