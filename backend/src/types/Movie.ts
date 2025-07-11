interface MovieType {
    _id: string;
    id: number;
    backdrop_path?: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity?: number;
    poster_path?: string;
    release_date: string;
    title?: string;
    video: boolean;
    vote_average?: number;
    vote_count?: number;
    videos?: string[];
    trailer?: string;
    totalRounds?: number;
  }

  export type { MovieType };