"use client";

export const dynamic = "force-dynamic";

import { LoadingSpinner } from "@/components/loading-spinner";
import {
  Page,
  PageContent,
  PageHeader,
  PageDescription,
  PageTitle,
} from "@/components/page";
import { SuggestItem } from "@/components/suggest-item";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";
import type { SuggestWiki } from "@/types/ifixit";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

export default function IfixitSearchPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Device search</PageTitle>
        <PageDescription>
          Type a device name to see suggestions in real time.
        </PageDescription>
      </PageHeader>
      <PageContent className="flex flex-col gap-4">
        <Suspense fallback={<LoadingSpinner big center />}>
          <Search />
        </Suspense>
      </PageContent>
    </Page>
  );
}

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);
  const [data, setData] = useState<SuggestWiki | undefined>();

  const ifixit = api.ifixit.suggestDevice.useMutation({
    onSuccess: (suggestData) => {
      setData(suggestData);
    },
  });

  const debouncedSearch = useDebounce((query: string) => {
    if (query) ifixit.mutate({ query });
    else setData(undefined);

    const params = new URLSearchParams(window.location.search);

    if (query) params.set("q", query);
    else params.delete("q");

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    void debouncedSearch(search);
  }, [search]);

  return (
    <>
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search devices..."
          className="pr-10"
        />
        {ifixit.isPending && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <LoadingSpinner padding={false} />
          </div>
        )}
      </div>
      {data?.results.length ? (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {data.results.map((item) => (
            <div key={item.wikiid} className="mb-4 break-inside-avoid">
              <Link
                href={`/ifixit/${item.namespace}/${encodeURIComponent(item.title)}`}
                className="block rounded-xl shadow-md transition hover:shadow-lg"
                prefetch
              >
                <SuggestItem {...item} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg font-semibold">No devices!</p>
      )}
    </>
  );
}
