import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="footer">
      <div class="column left-item">
        <div class="footer-item ">
          <img src="../../../icon/icon geo.svg" alt="footer" class="icon" />
          <h4 class="title">Adresse</h4>
        </div>
        <div class="textF">
          <p>21 boulevard Gambetta <br />38 000 Grenoble</p>
        </div>
      </div>

      <div class="column">
        <div class="footer-item">
          <img src="../../../icon/icon chat.svg" alt="footer" class="icon" />
          <h4 class="title">Contact</h4>
        </div>
        <div class="textF">
          <p>
            Phone : 04 58 00 56 68<br />

            <a href="http://discord.wspirit.fr !" target="_blank">
              Lien vers notre discord
            </a>
            <br />
            Mail : cmd&#64;wspirit.fr
          </p>
        </div>
      </div>

      <div class="column">
        <div class="footer-item">
          <img src="../../../icon/icon time.svg" alt="footer" class="icon" />
          <h4 class="title">Horaires</h4>
        </div>
        <div class="textF">
          <p>
            Lundi / Mercredi : 10h - 19h<br />
            Mardi / Jeudi / Vendredi : 10h - 1h<br />
            Samedi : 10h - 20h<br />
            Dimanche : 13h - 20h
          </p>
        </div>
      </div>

      <div class="column right-item">
        <div class="footer-item ">
          <h4 class="title">Liens</h4>
        </div>
        <div class="textF">
          <a href="https://wargamespirit.fr/" target="_blank">Wargame Spirit</a>
          <br />
          <a href="https://studio.wspirit.fr/" target="_blank"
            >Studio Wargame Spirit</a
          >
          <br />
          <div class="social-icons">
            <a href="https://www.facebook.com/wargamespirit/" target="_blank">
              <img
                src="../../../icon/icon facebook.webp"
                alt="footer"
                class="icon"
              />
            </a>
            <a href="https://www.instagram.com/wargamespirit/" target="_blank">
              <img
                src="../../../icon/icon insta.webp"
                alt="footer"
                class="icon"
              />
            </a>
            <a href="https://www.tiktok.com/@wargamespirit" target="_blank">
              <img
                src="../../../icon/icon tiktok.webp"
                alt="footer"
                class="icon"
              />
            </a>
            <a href="https://www.twitch.tv/wargamespirit" target="_blank">
              <img
                src="../../../icon/twitch logo.png"
                alt="footer"
                class="icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,

  styleUrl: './footer.component.css',
})
export class FooterComponent {}
