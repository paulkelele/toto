import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, materialModules],
  template: `
   <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>ProcessBuilder viewLogger</span>
      <span class="example-spacer"></span>
      <button mat-icon-button  aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar-row>
   </mat-toolbar>

  `,
  styles: [`
  .example-spacer {
  flex: 1 1 auto;
}`
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
