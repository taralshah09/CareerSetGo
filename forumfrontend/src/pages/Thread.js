import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import PostCardItem from '../components/PostCardItem'
import ReplyForm from '../components/ReplyForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@mui/material/Grid'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import ShareIcon from '@mui/icons-material/Share'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Thread = () => {
  let { user } = useContext(AuthContext)
  let params = useParams()
  let threadID = params.id

  let [thread, setThread] = useState(null)
  let [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [pin, setPin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Bookmark fetch
  useEffect(() => {
    const getBookmark = async () => {
      if (user !== null) {
        try {
          const token = localStorage.getItem("access_token")
          let response = await fetch(`/api/pin/${threadID}/${user['user_id']}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          let data = await response.json()
          setPin(JSON.parse(data.pinned))
        } catch (error) {
          console.error("Failed to fetch bookmark:", error)
        }
      }
    }
    getBookmark()
  }, [threadID, user])

  // Thread fetch
  useEffect(() => {
    const getThread = async () => {
      try {
        const token = localStorage.getItem("access_token")
        let response = await fetch(`/api/threads/${threadID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        let data = await response.json()
        setThread(data)
      } catch (error) {
        console.error("Failed to fetch thread:", error)
      }
    }
    getThread()
  }, [threadID])

  // Fetch posts with improved error handling and loading state
  const fetchPosts = useCallback(async (currentPage) => {
    if (isLoading) return null;

    try {
      setIsLoading(true)
      const token = localStorage.getItem("access_token")
      const response = await fetch(`/api/threads/${threadID}/posts?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching posts:", error)
      setHasMore(false)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [threadID, isLoading])

  // Initial posts load
  useEffect(() => {
    const loadInitialPosts = async () => {
      const data = await fetchPosts(1)
      if (data) {
        setPosts(data.results || [])
        setHasMore(data.next !== null)
      }
    }
    loadInitialPosts()
  }, [threadID, fetchPosts])

  // Fetch more posts for infinite scroll
  const fetchMorePosts = async () => {
    const nextPage = page + 1
    const data = await fetchPosts(nextPage)
    
    if (data && data.results.length > 0) {
      setPosts(prevPosts => [...prevPosts, ...data.results])
      setPage(nextPage)
      setHasMore(data.next !== null)
    } else {
      setHasMore(false)
    }
  }

  // Bookmark toggle handler
  const handleBookmark = async () => {
    try {
      setPin(!pin)
      const token = localStorage.getItem("access_token")
      const response = await fetch(`/api/pin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user['user_id'],
          thread: threadID,
          pin: !pin,
        }),
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error("Bookmark toggle failed:", error)
      // Revert pin state if request fails
      setPin(pin)
    }
  }

  return (
    <div style={{ marginTop: 100 }}>
      <Container>
        {/* Rest of your existing render code remains the same */}
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center', marginTop: 40 }} className="text-muted">
              You have seen all the posts.
            </p>
          }
        >
          <div style={{ padding: 1 }}>
            {posts.map((post, index) => (
              <PostCardItem key={post.id || index} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      </Container>

      <ReplyForm thread={thread} />
    </div>
  )
}

export default Thread