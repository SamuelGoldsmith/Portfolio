import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page";
import { PDF } from "@/components/pdf";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthorNames, Authors, type AuthorName } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProcessPage({ searchParams }: Props) {
  const params = await searchParams;
  const authorParam =
    typeof params.author === "string" ? params.author : undefined;
  const decoded = authorParam ? decodeURIComponent(authorParam) : undefined;

  const current_author = AuthorNames.includes(decoded as AuthorName)
    ? (decoded as AuthorName)
    : AuthorNames[0];

  if (!AuthorNames.includes(current_author)) return notFound();

  return (
    <Page>
      <PageHeader>
        <div className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div className="min-w-[200px] flex-1">
            <PageTitle>Our process!</PageTitle>
            <PageDescription>
              Read {current_author}&apos;s paper
            </PageDescription>
          </div>
          <Tabs defaultValue={current_author} className="w-fit">
            <TabsList>
              {AuthorNames.map((author) => (
                <TabsTrigger key={author} value={author} asChild>
                  <Link href={`?author=${author}`}>{author}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </PageHeader>
      <PageContent center>
        <PDF url={Authors[current_author].paperLocation} />
      </PageContent>
    </Page>
  );
}
