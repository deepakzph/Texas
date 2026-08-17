interface Schedule {
  time: string;
  days: string[];
}

interface Rating {
  average: number;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

interface Externals {
  tvrage: string;
  thetvdb: string;
  imdb: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Self {
  href: string;
}

interface PreviousEpisode {
  href: string;
  name: string;
}

interface Links {
  self: Self;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: string;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: Network | null;
  dvdCountry: string | null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: string;
  _links: Links;
  previousepisode: PreviousEpisode;
}
