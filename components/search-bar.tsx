import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative flex-grow">
      <Input
        className="w-full bg-gray-100/80 border-0 h-9 rounded-full pl-4"
        placeholder="Find a character..."
        type="search"
      />
    </div>
  )
}

