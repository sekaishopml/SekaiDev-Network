import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/content/config";

/** Bare `/` is handled by middleware; this is a safety net. */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
