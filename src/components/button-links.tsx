import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { TooltipTrigger, TooltipContent, Tooltip } from "./ui/tooltip";

const BaseButton = ({
  href,
  children,
  tip,
}: {
  href: string;
  children: React.ReactNode;
  tip: string;
}) => {
  return (
    <Tooltip>
      <span>
        <TooltipTrigger asChild>
          <Button variant={"link"} className="p-0" size="icon" asChild>
            <Link href={href}>{children}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </span>
    </Tooltip>
  );
};

export const GitHubButton = ({ href }: { href: string | undefined }) => {
  if (!href) return;
  return (
    <BaseButton href={href} tip={"Github"}>
      <GithubIcon />
    </BaseButton>
  );
};

export const LinkedInButton = ({ href }: { href: string | undefined }) => {
  if (!href) return;
  return (
    <BaseButton href={href} tip={"LinkedIn"}>
      <LinkedinIcon />
    </BaseButton>
  );
};

export const PortfolioButton = ({ href }: { href: string | undefined }) => {
  if (!href) return;
  return (
    <BaseButton href={href} tip={"Portfolio"}>
      <FolderIcon />
    </BaseButton>
  );
};
