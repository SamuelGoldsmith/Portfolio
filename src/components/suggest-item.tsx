import type { Wiki } from "@/types/ifixit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export function SuggestItem({ display_title, image, summary }: Wiki) {
  const imageSrc =
    image.original ??
    image["440x330"] ??
    image["200x150"] ??
    image.medium ??
    image.thumbnail ??
    image.mini;

  return (
    <Card className="flex h-full flex-col justify-between transition hover:shadow-lg">
      <CardHeader>
        <CardTitle>{display_title}</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
          <Image
            src={imageSrc}
            alt={`Image for ${display_title}`}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={image["140x105"] ?? image.thumbnail}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </CardContent>
    </Card>
  );
}
