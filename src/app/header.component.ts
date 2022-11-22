import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, materialModules, ReactiveFormsModule ],
  template: `
   <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>ProcessBuilder viewLogger</span>
      <span class="example-spacer"></span>
      <mat-slide-toggle [formControl]="toggleControl" class="mr-8">
      </mat-slide-toggle>
      <button mat-icon-button  aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar-row>
   </mat-toolbar>

  `,
  styles: [`
`
  ]
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });
  }

}
