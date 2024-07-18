import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  template: ` <router-outlet></router-outlet> `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
