import {
  GitHubButton,
  LinkedInButton,
  PortfolioButton,
} from "@/components/button-links";
import {
  Page,
  PageContent,
  PageHeader,
  PageDescription,
  PageTitle,
} from "@/components/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Authors } from "@/lib/constants";

export default async function AboutUsPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>About us</PageTitle>
        <PageDescription>
          We are a group of students from Worcester Polytechnic Institute
        </PageDescription>
      </PageHeader>
      <PageContent center>
        <Accordion type="single" collapsible className="w-2/3" defaultValue="">
          <TooltipProvider>
            {Object.entries(Authors).map(([name, info]) => (
              <AccordionItem value={name} key={name}>
                <AccordionTrigger>{name}</AccordionTrigger>
                <AccordionContent className="px-[12]">
                  {info.major && <p>{info.major}</p>}
                  <p>Contact Info:</p>
                  <GitHubButton href={info.githubUrl} />
                  <LinkedInButton href={info.linkedInUrl} />
                  <PortfolioButton href={info.portfolioUrl} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </TooltipProvider>
        </Accordion>
      </PageContent>
    </Page>
  );
}
