import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurableFormComponent } from './configurable-form/configurable-form.component';
import { ButtonComponent } from './configurable-form/elements/button/button.component';
import { InputComponent } from './configurable-form/elements/input/input.component';
import { SelectComponent } from './configurable-form/elements/select/select.component';
import { ConfigurableFieldDirective } from './configurable-form/directives/configurable-field.directive';

@NgModule({
  declarations: [
    ConfigurableFormComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    ConfigurableFieldDirective
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ConfigurableFormComponent]
})
export class NgFormModule {}
