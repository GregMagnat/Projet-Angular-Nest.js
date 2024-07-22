import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule],
  template: `
    <div class="home-container">
      <div class="main-content">
        <div class="main-left">
          <h1>Venez profitez de nos tables de jeux avec vos amis</h1>
          <div class="buttons-group">
            <button class="left-button">Revervé une table</button>
            <button>Voir la boutique</button>
          </div>
        </div>

        <div class="main-right">
          <img src="../../../Logo.webp" alt="" style="width: 500px" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
// https://material.angular.io/components/grid-list/examples
