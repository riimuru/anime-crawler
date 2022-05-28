export interface GogoEpisode {
  id: string;
  number: number;
  url?: string;
}

export interface Gogoanime {
  id: string;
  title: string;
  url: string;
  type?: string;
  subOrDub?: SubOrDub;
  image?: string;
  status?: string;
  releasedDate?: number;
  genres?: string[];
  otherNames?: string[] | string;
  description?: string;
  totalEpisodes?: number;
  episodes?: GogoEpisode[];
  [x: string]: unknown;
}

export interface GogoanimeRecent {
  episodeId?: string;
  animeTitle?: string;
  episodeNum?: number | string;
  subOrDub?: string;
  animeImg?: string;
  episodeUrl?: string;
}

export enum SubOrDub {
  SUB = "sub",
  DUB = "dub",
}

export enum Types {
  SUB = 1,
  DUB = 2,
  CHINESE = 3,
}
