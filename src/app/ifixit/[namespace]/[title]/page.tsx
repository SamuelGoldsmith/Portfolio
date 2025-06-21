import { Button } from "@/components/ui/button";
import { fetchGeminiBlurb } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page";
import { IFixit, ifixitAPI } from "@/lib/ifixit";
import { api } from "@/trpc/server";
import { type Namespace } from "@/types/ifixit";
import { DownloadIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Badge,
  badgeVariants,
  badgeVariantsNumberMap,
} from "@/components/ui/badge";
import type { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ namespace: string; title: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title } = await params;
  return {
    title: decodeURIComponent(title),
    description: `Repair scores and information about ${decodeURIComponent(title)}`,
  };
}

export async function generateStaticParams() {
  const { data } = await ifixitAPI.get<{
    display_titles: Record<string, string>;
    hierarchy: Record<string, unknown>;
  }>("/wikis/CATEGORY?display=hierarchy");

  return Object.values(data.display_titles).map((entry) => ({
    namespace: "CATEGORY",
    title: entry,
  }));
}

export default async function DevicePage({ params }: Props) {
  const { namespace, title } = await params;
  const ifixit = new IFixit();

  const data = await api.ifixit.deviceWikiFromNamespaceTitle({
    namespace: namespace as Namespace,
    title,
  });

  if (!data) return notFound();

  const info = ifixit.info(data);

  const {
    image,
    repairability_score,
    documents,
    page_title,
    description,
    solutions_url,
  } = data;

  return (
    <Page>
      <PageHeader>
        <PageTitle>{page_title ?? decodeURIComponent(title)}</PageTitle>
        <PageDescription>{description}</PageDescription>
      </PageHeader>
      <PageContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <Image
            src={
              image
                ? (image.huge ?? image.original ?? image.thumbnail)
                : "/wpi_logo_emb.png"
            }
            alt={`Image for ${title}`}
            width={600}
            height={450}
            className="rounded-md object-cover"
            placeholder="blur"
            blurDataURL={
              image
                ? (image["140x105"] ?? image.thumbnail)
                : "/wpi_logo_emb.png"
            }
          />
        </div>
        <div className="col-span-2 flex flex-col space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Some Important Information
            </h2>
            <div className="mt-4 flex flex-col space-y-4">
              {info.average_difficulty.word && (
                <p className="font-medium">
                  Average guide difficulty rating{" "}
                  <Badge variant={info.average_difficulty.word}>
                    {info.average_difficulty.word}
                  </Badge>
                </p>
              )}
              <div className="flex flex-col space-y-3">
                <IfixitRepairabilityScore score={repairability_score} />
                <p className="font-medium">
                  Our repairability score{" "}
                  <Link
                    href="/process?author=Brendon%20Peters"
                    className={badgeVariants({
                      variant:
                        badgeVariantsNumberMap[info.ourScore] ??
                        "Very difficult",
                    })}
                  >
                    {info.ourScore}/10
                  </Link>
                </p>
                <SolutionUrl url={solutions_url} />
                <FrenchRepairability documents={documents} />
                <GemeniBlurb
                  prodName={page_title ?? decodeURIComponent(title)}
                />
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}

function FrenchRepairability({
  documents,
}: {
  documents: { title: string; download_url: string }[];
}) {
  const indexDoc = documents.find((doc) =>
    doc.title.toLowerCase().includes("index"),
  );
  if (!indexDoc) return null;
  return (
    <p className="font-medium">
      French repairability index document
      <Button asChild variant="link" size="icon">
        <Link href={indexDoc.download_url}>
          <DownloadIcon />
        </Link>
      </Button>
    </p>
  );
}

function IfixitRepairabilityScore({ score }: { score?: number | null }) {
  if (!score) return null;
  return (
    <p className="font-medium">
      iFixit repairability score{" "}
      <Link
        href="https://www.ifixit.com/Wiki/Repairability_Scoring_Rubric_v2.0"
        className={badgeVariants({
          variant: badgeVariantsNumberMap[score] ?? "Very difficult",
        })}
      >
        {score}/10
      </Link>
    </p>
  );
}

function SolutionUrl({ url }: { url?: string | null }) {
  if (!url) return null;
  return (
    <p className="font-medium">
      View iFixit Solution
      <Button asChild variant="link" size={"icon"}>
        <Link href={url}>
          <LinkIcon />
        </Link>
      </Button>
    </p>
  );
}

async function GemeniBlurb({ prodName }: { prodName: string }) {
  const blurb = await fetchGeminiBlurb(prodName);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{blurb}</ReactMarkdown>;
}
