import Image from "next/image"
import DisneyLogo from '@/app/images/disney.svg'

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container px-6 py-8">
        <Image
          src={DisneyLogo}
          alt="Disney"
          width={100}
          height={40}
          className="h-10 w-auto mx-auto mb-4"
        />
        <p className="text-center text-sm text-muted-foreground">
          For educational use only. All characters and content are the property of Disney. 
          This test is for private use and development testing only and should not be distributed for public consumption
        </p>
      </div>
    </footer>
  )
}

