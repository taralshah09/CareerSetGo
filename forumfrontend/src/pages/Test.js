import React, {useEffect, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ThreadListItem from '../components/ThreadListItem'

const Test = () => {
    const [threads, setThreads] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getThreads = async () => {
            const token = localStorage.getItem("token") // Assuming token is saved in localStorage

            const response = await fetch(`/api/threads/?page=${page}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Adding token to request header
                },
            })
            let data = await response.json()
            console.log('Data:', data)
            setThreads(data.results)
        }
        getThreads()
    }, [])

    const getMoreThreads = async () => {
        setPage(page + 1)
        const token = localStorage.getItem("token")
        const response = await fetch(`/api/threads/?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        let data = await response.json()
        return data.results
    }

    const fetchData = async () => {
        const moreThreads = await getMoreThreads()
        setThreads([...threads, ...moreThreads])

        if (moreThreads.length === 0 || moreThreads.length < 15) {
            setHasMore(false)
        }
        setPage(page + 1)
    }

    return (
        <InfiniteScroll
            dataLength={threads.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>You have seen all the threads.</p>}
        >
            {threads.map((thread, index) => (
                <ThreadListItem key={index} thread={thread} />
            ))}
        </InfiniteScroll>
    )
}

export default Test
