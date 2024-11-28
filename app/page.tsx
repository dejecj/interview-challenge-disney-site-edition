"use client"
import { list } from "@/actions/character";
import { CharacterCard, CharacterCardSkeleton } from "@/components/character-card"
import { FeaturedCharacters } from "@/components/featured-characters"
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/search";
import { Character } from "@/types/characters";
import { Pagination as DisneyPagination } from "@/types/disney-api";
import { useCallback, useEffect, useState } from "react";
import featuredCharacters from '@/app/_static/featured-characters.json'
import { useToast } from "@/hooks/use-toast";

interface FetchCharactersParams {
  page?: string;
  name?: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<DisneyPagination>();
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useSearch();
  const {toast} = useToast()

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
      toast({
        title: "Error",
        description: _characters.error.message,
        variant: "destructive"
      })
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

  const renderCards = useCallback(() => {
    const skeletons = [1,2,3,4,5,6,7,8].map(n=><CharacterCardSkeleton key={`skeleton-${n}`}/>);
    if(isLoading) {
      if(searchTerm){
        return skeletons;
      } else {
        return [
          ...characters.map((character) => (
            <CharacterCard key={character._id} {...character}/>
          )),
          ...skeletons
        ]
      }
    } else {
      return characters.map((character) => (
        <CharacterCard key={character._id} {...character}/>
      ))
    }
  },[isLoading, characters])

  return (
    <>
      <section className="container">
        <div className="bg-gray-50">
          {searchTerm && !isLoading ? <h3 className="font-lato text-center text-2xl pt-8">Search Results - {searchTerm}</h3> : null}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6 py-8">
            {renderCards()}
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

