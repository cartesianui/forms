import { Component, Injector, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent, ChildComponent } from '@cartesianui/common';

@Component({
  template: ''
})
export abstract class FormBaseComponent<TDataModel, TChildComponent extends ChildComponent = {}> extends BaseComponent<TChildComponent> {

  @Output() onCreate: EventEmitter<TDataModel> = new EventEmitter();

  formGroup: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }

}
