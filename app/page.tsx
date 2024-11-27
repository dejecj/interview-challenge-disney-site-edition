"use client"
import { list } from "@/actions/character";
import { CharacterCard } from "@/components/character-card"
import { FeaturedCharacters } from "@/components/featured-characters"
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/search";
import { Character } from "@/types/characters";
import { Pagination as DisneyPagination } from "@/types/disney-api";
import { useEffect, useState } from "react";

const featuredCharacters = [
  {
    name: "Belle",
    imageUrl: "/placeholder.svg",
    films: ["Beauty and the Beast", "Beauty and the Beast: The Enchanted Christmas"]
  },
  {
    name: "The Beast",
    imageUrl: "/placeholder.svg",
    films: ["Beauty and the Beast", "Beauty and the Beast: The Enchanted Christmas"]
  },
  {
    name: "Mickey Mouse",
    imageUrl: "/placeholder.svg",
    films: ["Hollywood Party", "Fantasia", "Fun and Fancy Free"]
  },
  {
    name: "Donald Duck",
    imageUrl: "/placeholder.svg",
    films: ["The Reluctant Dragon", "Saludos Amigos", "The Three Caballeros"]
  }
]

interface FetchCharactersParams {
  page?: string;
  name?: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<DisneyPagination>();
  const [isLoading, setIsLoading] = useState(false);
  const { searchTerm } = useSearch();

  const fetchCharacters = async ({ page, name }: FetchCharactersParams) => {
    setIsLoading(true);
    const options: FetchCharactersParams = {};
    if(page) options.page = page;
    if(name) options.name = name;

    let _characters = await list(options)
    if (_characters.success) {
      if (page) {
        setCharacters(prevCharacters => [...prevCharacters, ..._characters.data]);
      } else {
        setCharacters(_characters.data);
      }
      setPagination(_characters.pagination);
    } else {
      // TODO: Error toast
      console.error("Failed to fetch characters");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacters({ name: searchTerm });
  }, [searchTerm]);

  const handleLoadMore = () => {
    if (pagination?.nextPage) {
      fetchCharacters({ page: pagination.nextPage, name: searchTerm });
    }
  };

  return (
    <>
      <section className="container">
        <div className="bg-gray-50">
          {searchTerm && !isLoading ? <h3 className="font-lato text-center text-2xl pt-8">Search Results - {searchTerm}</h3> : null}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6 py-8">
            {characters.map((character) => (
              <CharacterCard key={character.name} {...character} />
            ))}
          </div>
          {pagination?.nextPage && (
            <div className="mt-8 mb-8 flex justify-center">
              <Button onClick={handleLoadMore} disabled={isLoading} className="bg-disney-blue">
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
          <FeaturedCharacters characters={featuredCharacters} />
        </div>
      </section>

    </>
  )
}

