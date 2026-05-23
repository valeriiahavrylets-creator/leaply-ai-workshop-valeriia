import { RiAlertLine } from "@remixicon/react"

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
    >
      <RiAlertLine className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
