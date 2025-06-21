import Link from "next/link";
import { Button } from "./ui/button";

export function PDF({ url, height = 600 }: { url: string; height?: number }) {
  return (
    <object
      key={url}
      data={url}
      width="100%"
      height={`${height}px`}
      type="application/pdf"
    >
      <p>
        Your browser doesn&apos;t support PDFs. Please download the PDF to view
        it{" "}
        <Button variant={"link"} asChild className="p-0">
          <Link href={url}>by clicking here.</Link>
        </Button>
      </p>
    </object>
  );
}
