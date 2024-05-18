import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css',
})
export class AddInventoryComponent implements OnInit {

  ngOnInit(): void { }

}
