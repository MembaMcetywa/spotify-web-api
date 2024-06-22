export type Artist = {
  id: string;
  images: { url: string }[];
  name: string;
};

export type HomeType = {
  authEndpoint: string;
  clientId: string;
  redirectUri : string;
  responseType: string
}

export type HomeProps = {
  token: string | null;
  setToken: (token: string) => void;
}

export type SidebarProps = {
  token: string | null;
  setToken: (token: string) => void;
}



export interface LoginProps {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string | null;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Album {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  uri: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  total_tracks: number;
}

export interface Track {
  preview_url: string;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
  album: Album;
  artists: Artist[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: { isrc: string };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  uri: string;
  is_local: boolean;
}