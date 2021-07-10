import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { LoginComponent } from './login/login.component';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search-artists',
    component: SearchArtistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Albums',
    component: ArtistAlbumsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
