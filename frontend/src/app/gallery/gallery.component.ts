import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
    <div class="gallery">
      <img src="../../../jeu/jeu1.jpg" alt="Jeu 1" class="jeu"/>
      <img src="../../../jeu/jeu2.jpg" alt="Jeu 2" class="jeu"/>
      <img src="../../../jeu/jeu3.jpg" alt="Jeu 3" class="jeu"/>
      <img src="../../../jeu/jeu4.jpg" alt="Jeu 4" class="jeu"/>
      <img src="../../../jeu/jeu5.jpg" alt="Jeu 5" class="jeu"/>
      <img src="../../../jeu/jeu6.jpg" alt="Jeu 6" class="jeu"/>
    </div>
  `,
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {}
