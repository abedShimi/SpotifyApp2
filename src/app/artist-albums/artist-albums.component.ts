import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/appService/app.service';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css'],
})
export class ArtistAlbumsComponent implements OnInit {
  albums: any[];
  id: string;
  isLoading: boolean = false;
  name: string;

  constructor(private appService: AppService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.name = params['name'];
    });
  }

  ngOnInit(): void {
    this.getAlbums(this.id);
  }

  getAlbums(id: string) {
    this.isLoading = true;
    this.appService.getAlbums(id).subscribe((result) => {
      this.albums = result.items;
      this.isLoading = false;
    });
  }

  getSrc(album: any): string {
    if (album.images.length > 0) return album.images[1].url;

    return 'assets/noProfile.png';
  }
}
