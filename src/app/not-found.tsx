import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Out of tune">
      That page isn&apos;t part of Laras. <Link href="/" className="text-gold underline">Back to the start</Link>.
    </PageHeader>
  );
}
