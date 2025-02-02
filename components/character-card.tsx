import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ImageWithFallback } from "./image"

interface CharacterCardProps {
  _id: number,
  name: string
  imageUrl: string
  films: string[]
}

export function CharacterCard({ _id, name, imageUrl, films }: CharacterCardProps) {
  return (
    <Card className="overflow-hidden rounded-none border-none">
      <div className="aspect-square overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          fallback="https://placehold.co/400x600?text=Not%20Found"
        />
      </div>
      <CardContent className="p-4 pb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Featured Films</h3>
          <p className="text-sm mt-1 line-clamp-2">{films.join(", ") || 'No Films Found'}</p>
        </div>
        <Link 
          href={`/characters/${_id}`} 
          className="text-sm font-semibold uppercase text-black hover:text-gray-700 underline"
        >
          VIEW PROFILE
        </Link>
      </CardContent>
    </Card>
  )
}

export function CharacterCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-none animate-pulse">
      <div className="aspect-square w-full bg-gray-200" />
      <CardContent className="p-4 pb-6 text-center">
        <div className="h-6 w-3/4 mx-auto mb-2 bg-gray-200 rounded" />
        <div className="mb-4">
          <div className="h-4 w-1/2 mx-auto mb-2 bg-gray-200 rounded" />
          <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-1/3 mx-auto bg-gray-200 rounded" />
      </CardContent>
    </Card>
  )
}