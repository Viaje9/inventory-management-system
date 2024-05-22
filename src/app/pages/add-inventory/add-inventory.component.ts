import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component, signal, type OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { Observable, map, single, startWith } from 'rxjs';
import { AutocompleteComponent } from '../../shared/components/autocomplete/autocomplete.component';
import { toObservable } from '@angular/core/rxjs-interop';

export interface Option {
  value: number;
  name: string;
}


@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [
    SharedModule,
    AutocompleteComponent
  ],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css',
})
export class AddInventoryComponent implements OnInit {

  colorOptions = signal([
    ...this.getLocalStorage('colorOptions'),
  ])

  colorOptions$ = toObservable(this.colorOptions);

  sizeOptions = signal([
    ...this.getLocalStorage('sizeOptions'),
  ]);

  sizeOptions$ = toObservable(this.sizeOptions);

  ngOnInit(): void {
    this.sizeOptions$.subscribe((sizeOptions) => {
      this.setLocalStorage('sizeOptions', sizeOptions);
    });

    this.colorOptions$.subscribe((colorOptions) => {
      this.setLocalStorage('colorOptions', colorOptions);
    });
  }


  private getLocalStorage(key: string): Option[] {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '[]') : [];
  }

  private setLocalStorage(key: string, value: Option[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
