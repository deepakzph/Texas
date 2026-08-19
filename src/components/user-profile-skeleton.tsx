import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileSkeleton() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex-row items-start gap-4 px-6">
        <Skeleton className="size-20 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-6">
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}
