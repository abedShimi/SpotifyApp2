import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/authService/auth.service';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/appService/app.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/AuthGuard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchArtistComponent,
    ArtistAlbumsComponent,
    LoginPageComponent,
    SearchPageComponent,
    AlbumsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [AuthService, AppService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
