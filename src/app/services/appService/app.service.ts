import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../authService/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  searchArtisits(searchKey: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.authService.getBeareToken()
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .get<any>(
        `https://api.spotify.com/v1/search?q=${searchKey}&type=artist&market=US&limit=50&offset=5`,
        { headers: headers }
      )
      .pipe(
        catchError((err) => {
          this.authService.clearBearer();
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
  }

  getAlbums(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.authService.getBeareToken()
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .get<any>(
        `https://api.spotify.com/v1/artists/${id}/albums?include_groups=single%2Cappears_on&market=ES&limit=10&offset=5`,
        { headers: headers }
      )
      .pipe(
        catchError((err) => {
          this.authService.clearBearer();
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
  }
}
