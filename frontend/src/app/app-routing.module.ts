import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReserveComponent } from './reserve/reserve.component';
import { GalleryComponent } from './gallery/gallery.component';
import { WhereComponent } from './where/where.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'where', component: WhereComponent },
    { path: 'admin', component: AdminComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
