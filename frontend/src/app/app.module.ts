import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importer RouterModule ici
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReserveComponent } from './reserve/reserve.component';
import { GalleryComponent } from './gallery/gallery.component';
import { WhereComponent } from './where/where.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReserveComponent,
    GalleryComponent,
    WhereComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule, // Assurez-vous d'importer RouterModule ici
    AppRoutingModule  // Importez AppRoutingModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
