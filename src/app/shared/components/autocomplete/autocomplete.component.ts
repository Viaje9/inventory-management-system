import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, model, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, merge, startWith } from 'rxjs';
import { SharedModule } from '../../shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { toObservable } from '@angular/core/rxjs-interop';


export interface Option {
  value: number;
  name: string;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    OverlayModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent {

  cdr = inject(ChangeDetectorRef);

  label = input.required<string>()
  options = input.required<Option[]>()

  updateOptions = output<Option[]>()

  showOptions = false;

  optionValue = signal('');

  filterOptions: Option[] = [];

  selectedOptionList: Option[] = [];

  optionValue$ = toObservable(this.optionValue);
  options$ = toObservable(this.options);

  ngOnInit() {
    merge(this.optionValue$, this.options$).subscribe(() => {
      this.processOptions();
      this.cdr.detectChanges();
    })
  }




  onFocus() {
    this.showOptions = true;
    this.processOptions();
  }

  private processOptions() {
    this.filterOptions = this.options()
      // .filter(item => {
      //   return !this.selectedOptionList.find(selectedOption => selectedOption.value === item.value);
      // })
      .filter(option => {
        return this._normalizeValue(option.name).includes(this._normalizeValue(this.optionValue()));
      })
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onBlur() {
    this.showOptions = false;
  }

  addOption() {
    const optionIndex = this.options().findIndex(option => option.name === this.optionValue())
    if (optionIndex === -1) {
      const newOption = {
        value: new Date().getTime(),
        name: this.optionValue()
      }
      const newOptions = [
        ...this.options(),
        newOption
      ]

      this.updateOptions.emit(newOptions)
      this.onClickOption(newOption)
    } else {
      this.onClickOption(this.options()[optionIndex])
    }

    this.optionValue.set('')
  }

  removeSelectedOption(value: number) {
    this.selectedOptionList = this.selectedOptionList.filter(option => option.value !== value)
  }

  onClickOption(option: Option) {
    const selectedOptionIndex = this.selectedOptionList.findIndex(selectedOption => selectedOption.value === option.value);
    if (selectedOptionIndex === -1) {
      this.selectedOptionList.push(option);
    } else {
      this.selectedOptionList.splice(selectedOptionIndex, 1);
    }
    this.optionValue.set('')
    this.showOptions = false;
  }

  onClickDeleteOption(value: number) {
    const newOption = this.options().filter(option => option.value !== value)
    this.updateOptions.emit(newOption)
  }
}

