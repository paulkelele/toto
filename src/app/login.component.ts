import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { materialModules } from './material';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  template: `
  <p></p>
    <button mat-raised-button color="primary">dd</button>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
