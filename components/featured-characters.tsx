import { CharacterCard } from "@/components/character-card"

interface Character {
  name: string;
  imageUrl: string;
  films: string[];
}

interface FeaturedCharactersProps {
  characters: Character[];
}

export function FeaturedCharacters({ characters }: FeaturedCharactersProps) {
  return (
    <section className="bg-disney-blue">
      <div className="container px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Featured Characters!
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard key={character.name} {...character} />
          ))}
        </div>
      </div>
    </section>
  )
}

