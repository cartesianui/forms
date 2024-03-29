import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurableFormComponent } from './configurable-form/configurable-form.component';
import { ButtonComponent } from './configurable-form/elements/button/button.component';
import { InputComponent } from './configurable-form/elements/input/input.component';
import { SelectComponent } from './configurable-form/elements/select/select.component';
import { ConfigurableFieldDirective } from './configurable-form/directives/configurable-field.directive';
import {
  NoWhiteSpaceValidator,
  EqualValidator,
  EmailValidator,
  DomainValidator,
  DateValidator,
  AgeValidator,
  InCollectionValidator,
  NotInCollectionValidator,
  FloatValidator,
  UnicodeValidator,
  NumericValidator,
  ValidateDirective,
  WithValidationComponent,
  ValidationService,
  RequireRelativeValidator
} from './validation';

@NgModule({
  declarations: [
    RequireRelativeValidator,
    NoWhiteSpaceValidator,
    EqualValidator,
    EmailValidator,
    DomainValidator,
    DateValidator,
    AgeValidator,
    InCollectionValidator,
    NotInCollectionValidator,
    FloatValidator,
    UnicodeValidator,
    NumericValidator,
    ConfigurableFormComponent,
    WithValidationComponent,
    ValidateDirective,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    ConfigurableFieldDirective
  ],
  imports: [CommonModule, AngularFormsModule, ReactiveFormsModule],
  exports: [
    RequireRelativeValidator,
    NoWhiteSpaceValidator,
    EqualValidator,
    EmailValidator,
    DomainValidator,
    DateValidator,
    AgeValidator,
    InCollectionValidator,
    NotInCollectionValidator,
    FloatValidator,
    UnicodeValidator,
    NumericValidator,
    ConfigurableFormComponent,
    WithValidationComponent,
    ValidateDirective
  ],
  providers: [ValidationService]
})
export class FormsModule {
  static forRoot(): ModuleWithProviders<FormsModule> {
    return {
      ngModule: FormsModule,
      providers: [ValidationService]
    };
  }

  static forFeature(): ModuleWithProviders<FormsModule> {
    return {
      ngModule: FormsModule,
      providers: [ValidationService]
    };
  }
}
