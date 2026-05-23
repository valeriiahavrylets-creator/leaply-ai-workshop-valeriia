import { redirect } from "next/navigation"

import { SegmentSchema } from "@/lib/schemas/court"

import { CourtFlow } from "./court-flow"

export default async function CourtPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string }>
}) {
  const params = await searchParams
  const parsed = SegmentSchema.safeParse(params.segment)
  if (!parsed.success) {
    redirect("/")
  }
  return <CourtFlow segment={parsed.data} />
}
