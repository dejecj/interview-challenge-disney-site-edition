"use client"
import Image from "next/image"
import { User } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"
import DisneyLogo from '@/app/images/disney.svg'
import Link from "next/link"

export function NavBar() {
  return (
    <header className="bg-white">
      <div className="container flex items-center justify-between py-4 px-6 gap-4">
        <Link href="/">
          <Image
            src={DisneyLogo}
            alt="Disney"
            width={100}
            height={40}
            className="h-10 w-auto flex-shrink-0"
          />
        </Link>
        <SearchBar />
        <div className="w-10 h-10 rounded-full bg-disney-blue flex items-center justify-center flex-shrink-0">
          <Link href="/profile"><User className="text-white" size={20} /></Link>
        </div>
      </div>
    </header>
  )
}

