import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { User } from "@/lib/api"

interface UserCardProps {
  user: User
  rank: number
}

export default function UserCard({ user, rank }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="rounded-full object-cover"
              fill
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.commentCount} comments</p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              #{rank}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
