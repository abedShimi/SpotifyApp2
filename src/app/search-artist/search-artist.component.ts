import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { createDefaultClause } from 'typescript';
import { Artist } from '../models/models';
import { AppService } from '../services/appService/app.service';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css'],
})
export class SearchArtistComponent implements OnInit {
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  searchValue: string;
  artists: Artist[];
  isLoading: boolean = false;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['searchKey']) {
        this.searchValue = params['searchKey'];
        this.SearchArtists(this.searchValue);
      }
    });
  }

  SearchArtists(searchKey: string) {
    this.myMethodChangingQueryParams(searchKey);

    if (searchKey == '') {
      this.artists = [];
      return;
    }

    this.isLoading = true;
    this.appService.searchArtisits(searchKey).subscribe((result) => {
      this.artists = result.artists.items;
      this.isLoading = false;
      console.log(result);
      console.log(this.artists);
    });
  }

  getSrc(artist: Artist): string {
    if (artist.images.length > 0) return artist.images[1].url;

    return 'assets/noProfile.png';
  }

  formatNumber(n: number): string {
    let ranges = [
      { divider: 1e18, suffix: 'E' },
      { divider: 1e15, suffix: 'P' },
      { divider: 1e12, suffix: 'T' },
      { divider: 1e9, suffix: 'G' },
      { divider: 1e6, suffix: 'M' },
      { divider: 1e3, suffix: 'k' },
    ];

    for (var i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toFixed(2).toString() + ranges[i].suffix;
      }
    }
    return n.toString();
  }

  myMethodChangingQueryParams(searchKey: string) {
    let queryParams: Params = { searchKey: searchKey };
    if (searchKey == '' || searchKey == null || searchKey == undefined)
      queryParams = { searchKey: null };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  viewAlbums(artist: Artist) {
    let queryParams: Params = {
      id: artist.id,
      name: artist.name,
      searchKey: null,
    };

    this.router.navigate(['/Albums'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }
}
