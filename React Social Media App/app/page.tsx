"use client"

import { useEffect, useState } from "react"
import { type User, getMockTopUsers } from "@/lib/api"
import UserCard from "@/components/user-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, we would use fetchTopUsers()
        // For demo purposes, we're using mock data
        const data = getMockTopUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to load top users:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Top Users</h1>
        <p className="text-muted-foreground">Users with the most commented posts across the platform</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>User Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user, index) => (
                <UserCard key={user.id} user={user} rank={index + 1} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
