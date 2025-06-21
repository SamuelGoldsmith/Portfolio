"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-[5rem]">
        Right to Repair ; )
      </h1>
      <hr className="my-[12] h-1 w-60 rounded-lg border-black bg-black" />
      <p className="mt-3 max-w-2xl text-center text-lg sm:text-xl">
        Check how repairable your product is,
        <br />
        and search for repair documentation! <br />
      </p>
      <form
        onSubmit={handleSubmit}
        className="my-[20] flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
}
