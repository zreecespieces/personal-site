import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Preview from "./Preview";

export const metadata: Metadata = {
  title: "Primitive Preview | Zachary Reece",
  description: "Development-only component showcase.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function PreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <Preview />;
}
