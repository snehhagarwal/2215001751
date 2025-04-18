// Types for our data
export interface User {
  id: string
  name: string
  avatar: string
  commentCount: number
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: string
}

export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: string
  comments: Comment[]
  commentCount: number
}

// API base URL
const API_URL = "http://localhost:3000/api"

// Fetch top users based on comment count
export async function fetchTopUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users/top`)
    if (!response.ok) {
      throw new Error("Failed to fetch top users")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching top users:", error)
    return []
  }
}

// Fetch trending posts (posts with most comments)
export async function fetchTrendingPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts/trending`)
    if (!response.ok) {
      throw new Error("Failed to fetch trending posts")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    return []
  }
}

// Fetch feed (newest posts)
export async function fetchFeed(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts/feed`)
    if (!response.ok) {
      throw new Error("Failed to fetch feed")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching feed:", error)
    return []
  }
}

// Mock data for development (will be replaced by actual API calls)
export function getMockTopUsers(): User[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40`,
    commentCount: Math.floor(Math.random() * 100) + 10,
  })).sort((a, b) => b.commentCount - a.commentCount)
}

export function getMockTrendingPosts(): Post[] {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `post-${i + 1}`,
    userId: `user-${Math.floor(Math.random() * 10) + 1}`,
    userName: `User ${Math.floor(Math.random() * 10) + 1}`,
    userAvatar: `/placeholder.svg?height=40&width=40`,
    content: `This is a sample post content ${i + 1}. It contains some text that would typically be found in a social media post.`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
    comments: Array.from({ length: Math.floor(Math.random() * 20) + 1 }, (_, j) => ({
      id: `comment-${i}-${j}`,
      userId: `user-${Math.floor(Math.random() * 10) + 1}`,
      userName: `User ${Math.floor(Math.random() * 10) + 1}`,
      userAvatar: `/placeholder.svg?height=30&width=30`,
      content: `This is a sample comment ${j + 1} on post ${i + 1}.`,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
    })),
    commentCount: 0, // Will be calculated
  }))
    .map((post) => {
      post.commentCount = post.comments.length
      return post
    })
    .sort((a, b) => b.commentCount - a.commentCount)
}

export function getMockFeed(): Post[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `post-${i + 1}`,
    userId: `user-${Math.floor(Math.random() * 10) + 1}`,
    userName: `User ${Math.floor(Math.random() * 10) + 1}`,
    userAvatar: `/placeholder.svg?height=40&width=40`,
    content: `This is a sample post content ${i + 1} in the feed. It contains some text that would typically be found in a social media post.`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
    comments: Array.from({ length: Math.floor(Math.random() * 10) }, (_, j) => ({
      id: `comment-${i}-${j}`,
      userId: `user-${Math.floor(Math.random() * 10) + 1}`,
      userName: `User ${Math.floor(Math.random() * 10) + 1}`,
      userAvatar: `/placeholder.svg?height=30&width=30`,
      content: `This is a sample comment ${j + 1} on post ${i + 1}.`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    })),
    commentCount: 0, // Will be calculated
  }))
    .map((post) => {
      post.commentCount = post.comments.length
      return post
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
