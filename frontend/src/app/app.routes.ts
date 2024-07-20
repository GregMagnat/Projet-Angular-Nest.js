import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'reservation', component: ReservationComponent, title: 'Reservation' },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery' },
  { path: 'about', component: AboutComponent, title: 'About' },
];

export { routes };
