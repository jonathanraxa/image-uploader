import { useState, useMemo } from "react";
import debounce from "debounce";
import type { ImageItem } from "../types";
import { searchImages } from "../api";

interface UseSearchProps {
  setAllImages: (images: ImageItem[]) => void;
}

export const useSearch = ({ setAllImages }: UseSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useMemo(() => {
    return debounce(async (query: string) => {
      const results = await searchImages(query);
      setAllImages(results);
    }, 500);
  }, [setAllImages]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return {
    searchQuery,
    handleSearch,
  };
};
