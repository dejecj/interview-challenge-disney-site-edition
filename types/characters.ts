interface BaseCaracter {
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    parkAttractions: string[];
    allies: string[];
    enemies: string[];
    sourceUrl: string;
    name: string;
    imageUrl: string;
    url: string;
};

export interface Character extends BaseCaracter {
    _id: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
}