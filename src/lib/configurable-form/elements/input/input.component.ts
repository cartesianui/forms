import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormValidatorService } from '../../../form-validator.service';
import { IFormField } from '../../models/form-field.model';

@Component({
  selector: 'form-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterViewChecked {
  @Input() config: IFormField;
  @Input() formGroup: FormGroup;
  @Output() changed?: EventEmitter<Event> = new EventEmitter();
  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  validators: ValidatorFn[];
  formValidatorService: FormValidatorService;

  constructor(formValidatorService: FormValidatorService) {
    this.formValidatorService = formValidatorService;
  }

  ngOnInit(): void {
    this.validators = this.config.validators;
  }

  ngAfterViewChecked(): void {
    if (this.validators !== this.config.validators) {
      this.validators = this.config.validators;
      const ctrl = this.formGroup.controls[this.config.name];
      ctrl.setValidators(this.validators);
      ctrl.updateValueAndValidity();
    }
  }

  getFormClasses(): string {
    const control = this.formGroup.controls[this.config.name];
    return this.formValidatorService.getFormClasses(control);
  }
}
