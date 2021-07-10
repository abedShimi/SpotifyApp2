export interface AuthObject {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  state: string;
}

export interface AuthError {
  error: string;
  state: string;
}

export interface Artist {
  name: string;
  popularity: number;
  images: any[];
  id: string;
  href: string;
  genres: string[];
  followers: any;
  external_urls: any;
}
