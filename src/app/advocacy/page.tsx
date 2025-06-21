import {
  Page,
  PageContent,
  PageHeader,
  PageDescription,
  PageTitle,
} from "@/components/page";
import { Link } from "lucide-react";

export default function AdvocacyPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Advocacy</PageTitle>
        <PageDescription>Enter content later</PageDescription>
      </PageHeader>
      <PageContent center>
        <p>Get involved! Make a change! Be the difference you want to see!</p>
        <Link href="#">Maybe a petition or smth</Link>
      </PageContent>
    </Page>
  );
}
