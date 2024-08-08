import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';

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
    redirectTo: 'admin/calendar',
    pathMatch: 'full',
  },
  {
    path: 'admin/calendar',
    component: AdminCalendarComponent,
    title: 'Calendar',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/calendar-old',
    component: CalendarComponent,
    title: 'Admin Calendar',
  },
];

export { routes };
