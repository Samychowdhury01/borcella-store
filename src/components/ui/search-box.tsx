"use client";

import { useState, useTransition } from "react";
import { Input } from "./input";
import { Loader, Search } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [loading, startTransition] = useTransition();

  const handleSearch = () => {
    router.push(`/search/${query}`);
  };
  return (
    <div className="flex items-center gap-x-2">
      <Input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Products.."
        className="w-full"
      />
      <Button size={"icon"} disabled={query === ""} onClick={handleSearch} className="cursor-pointer">
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <Search className="cursor-pointer" />
        )}
      </Button>
    </div>
  );
};

export default SearchBox;

