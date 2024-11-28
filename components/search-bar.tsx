"use client"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/search"
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';

export function SearchBar() {
  const { setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState('');
  const path = usePathname();
  const router = useRouter();

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        if(path !== '/') router.push('/');
        setSearchTerm(value);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    },
    [setSearchTerm]
  );

  useEffect(() => {
    const cancelDebounce = debouncedSearch(inputValue);
    return cancelDebounce;
  }, [inputValue, debouncedSearch]);

  return (
    <div className="relative flex-grow">
      <Input
        className="w-full bg-gray-100/80 border-0 h-9 rounded-full pl-4"
        placeholder="Find a character..."
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
}

