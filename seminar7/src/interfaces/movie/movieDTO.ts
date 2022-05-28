export interface MovieCreateDTO {
  title: string;
  director: string;
  openingDate?: Date;
  thumbnail?: string;
  content?: string;
}

export interface MovieUpdateDTO {
  title?: string;
  director?: string;
  openingDate?: Date;
  thumbnail?: string;
  content?: string;
}

export interface AllMovieResponseDTO {
  title: string;
  thumbbnail?: string;
}

export type MovieResponseDTO = MovieCreateDTO;
