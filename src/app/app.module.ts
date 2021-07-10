import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/authService/auth.service';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AppService } from './services/appService/app.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchArtistComponent,
    ArtistAlbumsComponent,
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
