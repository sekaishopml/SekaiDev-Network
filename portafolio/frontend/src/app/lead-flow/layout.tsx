import { DocumentShell } from "@/components/DocumentShell";

export default function LeadFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocumentShell lang="en">{children}</DocumentShell>;
}
