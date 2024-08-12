import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EditReservationFormComponent } from './edit-reservation-form/edit-reservation-form.component';
const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'reservation',
    component: ReservationComponent,
    title: 'Reservation',
  },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'adminWs',
    component: AdminCalendarComponent,
    title: 'adminWs',
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-reservation/:id',
    component: EditReservationFormComponent,
    title: 'edit',
    canActivate: [AuthGuard],
  },
];

export { routes };
