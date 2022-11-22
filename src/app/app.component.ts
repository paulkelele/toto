import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule, RouterModule ],
  template: `
    <router-outlet class="mat-app-background"></router-outlet>
  `,
  styles: [`
  `]
})
export class AppComponent {
  title = 'toto';
}
