import Image from "next/image"
import { User } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"

export function NavBar() {
  return (
    <header className="bg-white">
      <div className="container flex items-center justify-between py-4 px-6 gap-4">
        <Image
          src="/placeholder.svg"
          alt="Disney"
          width={100}
          height={40}
          className="h-10 w-auto flex-shrink-0"
        />
        <SearchBar />
        <div className="w-10 h-10 rounded-full bg-teal-900 flex items-center justify-center flex-shrink-0">
          <User className="text-white" size={20} />
        </div>
      </div>
    </header>
  )
}

