import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'search-artists',
    component: SearchPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Albums',
    component: AlbumsPageComponent,
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
