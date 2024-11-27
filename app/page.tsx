"use client"
import { list } from "@/actions/character";
import { CharacterCard } from "@/components/character-card"
import { FeaturedCharacters } from "@/components/featured-characters"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Character } from "@/types/characters";
import { Pagination as DisneyPagination } from "@/types/disney-api";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchCharacters = async ({ page, name }: FetchCharactersParams) => {
    setIsLoading(true);
    let _characters = await list({ page, name })
    if (_characters.success) {
      if (page && !name) {
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
    fetchCharacters({ name: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  const handleLoadMore = () => {
    if (pagination?.nextPage) {
      fetchCharacters({ page: pagination.nextPage, name: debouncedSearchTerm });
    }
  };

  return (
    <>
      <section className="container">
        <div className="px-6 py-8">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.name} {...character} />
            ))}
          </div>
          {pagination?.nextPage && (
            <div className="mt-8 flex justify-center">
              <Button onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </section>

      <FeaturedCharacters characters={featuredCharacters} />
    </>
  )
}

