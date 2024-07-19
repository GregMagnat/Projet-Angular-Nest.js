import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  template: `

<div class="footer">
  <div class="column">
    <div class="footer-item">
      <mat-icon>location_on</mat-icon>
      <div>
        <h4>Adresse</h4>
        <p>21 boulevard Gambetta <br>38 000 Grenoble</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="footer-item">
      <mat-icon>phone</mat-icon>
      <div>
        <h4>Contact</h4>
        <p>Phone : 04 58 00 56 68</p>
        <p>Discord : <a href="https://discord.gg/Q5kfuBmk" target="_blank">https://discord.gg/Q5kfuBmk</a></p>
        <p>Mail : cmdwspirit.fr</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="footer-item">
      <mat-icon>access_time</mat-icon>
      <div>
        <h4>Horaires</h4>
        <p>Lundi / Mercredi / Jeudi : 10h - 19h</p>
        <p>Mardi / Vendredi : 10h - 1h</p>
        <p>Samedi : 10h - 20h</p>
        <p>Dimanche : 13h - 20h</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="footer-item">
      <mat-icon>link</mat-icon>
      <div>
        <h4>Liens</h4>
        <a href="https://wargamespirit.fr/" target="_blank">Wargame Spirit</a><br>
        <a href="https://studio.wspirit.fr/k" target="_blank">Studio Wargame Spirit</a><br>
        <div class="social-icons">
          <a href="https://www.facebook.com/wargamespirit/" target="_blank"><mat-icon>facebook</mat-icon></a>
          <a href="https://www.instagram.com/wargamespirit/" target="_blank"><mat-icon>instagram</mat-icon></a>
          <a href="https://www.tiktok.com/@wargamespirit" target="_blank"><mat-icon>tiktok</mat-icon></a>
        </div>
      </div>
    </div>
  </div>
</div>

  `,
  
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
