"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Loading from "./loading"
import { get } from "@/actions/character"
import { Character } from "@/types/characters"
import Link from "next/link"
import { FeaturedCharacters } from "@/components/featured-characters"
import featuredCharacters from '@/app/_static/featured-characters.json'
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CharacterPage({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<Character>()
  const [isLoading, setIsLoading] = useState(true)
  const {toast} = useToast();

  const router = useRouter()

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true)
      const _character = await get(params.id)
      
      if (_character.success){
        setCharacter(_character.data);
      } else {
        toast({
          title: "Error",
          description: _character.error.message,
          variant: "destructive"
        })
        router.push('/');
      }
      setIsLoading(false);
    }

    fetchCharacter()
  }, [params.id])

  return (
    <>
      <section className="container">
        {
          isLoading || !character ?
          <Loading /> :
            <div className="bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{character.name}</h1>
                    <p className="text-sm text-muted-foreground">
                      Last Updated {character.updatedAt}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Featured Films</h2>
                    <ul className="list-disc pl-5 space-y-0.5 text-sm">
                      {character.films.map((film) => (
                        <li key={film}>{film}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Short Films</h2>
                    <ul className="list-disc pl-5 space-y-0.5 text-sm">
                      {character.shortFilms.map((film) => (
                        <li key={film}>{film}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">TV Shows</h2>
                    <ul className="list-disc pl-5 space-y-0.5 text-sm">
                      {character.tvShows.map((show) => (
                        <li key={show}>{show}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href={character.sourceUrl}>
                    <Button className="w-full bg-teal-900 hover:bg-teal-800 mt-8 w-fit ">
                      Explore More Character Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
        }
        <FeaturedCharacters characters={featuredCharacters} />
      </section>
    </>
  )
}
