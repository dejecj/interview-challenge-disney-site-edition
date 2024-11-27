import { Character } from "./characters";

export type Pagination = {
    totalPages: number;
    count: number;
    previousPage: string;
    nextPage: string;
  }

export interface ApiResponse {
    info: Pagination;
    data: Character[] | Character;
  };