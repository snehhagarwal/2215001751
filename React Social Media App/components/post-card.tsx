"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/api"

interface PostCardProps {
  post: Post
  rank?: number
}

export default function PostCard({ post, rank }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={post.userAvatar || "/placeholder.svg"}
              alt={post.userName}
              className="rounded-full object-cover"
              fill
              sizes="40px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{post.userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
          {rank && (
            <div className="flex-shrink-0">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                #{rank}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-800 dark:text-gray-200">{post.content}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 px-4 py-3 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{post.commentCount} comments</span>
          </div>
          {post.commentCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="text-xs">
              {showComments ? (
                <>
                  <ChevronUp className="mr-1 h-4 w-4" />
                  Hide Comments
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" />
                  Show Comments
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
      {showComments && post.comments.length > 0 && (
        <div className="border-t px-4 py-3 dark:border-gray-800">
          <h4 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Comments</h4>
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="relative h-6 w-6 flex-shrink-0">
                  <Image
                    src={comment.userAvatar || "/placeholder.svg"}
                    alt={comment.userName}
                    className="rounded-full object-cover"
                    fill
                    sizes="24px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{comment.userName}</p>
                    <p className="text-xs text-gray-800 dark:text-gray-200">{comment.content}</p>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
