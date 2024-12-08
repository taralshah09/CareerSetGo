import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadListItem from '../components/ThreadListItem';
import ThreadForm from '../components/ThreadForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';

const Topic = () => {
  // Extract thread id
  const params = useParams();
  const topicID = params.id;

  const topics = [
    "Entertainment",
    'Sports',
    'Gaming',
    'Music',
    'Technology',
    'News',
    'Anime',
    'Drama & Movie'
  ];

  // Initialize thread and posts component state
  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  // Function to get the token from localStorage or sessionStorage
  const getToken = () => {
    return localStorage.getItem('token');  // Assuming the token is stored in localStorage
  };

  // Trigger update depending on params of URL
  useEffect(() => {
    const getThreads = async () => {
      const token = getToken();
      
      const response = await fetch(`/api/threads/topic/${topicID}?page=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      // Parse the data in json
      let data = await response.json();

      // Update the state of threads
      setThreads(data.results);

      // Check if there are more threads
      if (data.next === null) {
        setHasMore(false);
      }
    };
    getThreads();
  }, [params]);

  // Fetch next page threads
  const getMoreThreads = async () => {
    try {
      const token = getToken();
      const response = await fetch(`/api/threads/topic/${topicID}?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      
      // Parse the data in json
      let data = await response.json();
      console.log("fetching");
      console.log(data);
      return data.results;
    } catch (err) {
      console.log("No next page.");
    }
  };

  const fetchData = async () => {
    // Get more threads from next fetch
    const moreThreads = await getMoreThreads();

    // Update the thread state by combining data
    setThreads([...threads, ...moreThreads]);

    // Check if there is a next page; if not, set HasMore to false
    if (moreThreads.length === 0 || moreThreads.length < 10) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  // Style the paper component
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  return (
    <div style={{ marginTop: 100 }}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <div className='d-flex justify-content-between mb-3'>
                <Typography variant="h5">{topics[topicID - 1]} Threads</Typography>
                <ThreadForm />
              </div>
              <Item>
                <InfiniteScroll
                  dataLength={threads.length} // This is an important field to render the next data
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<h4 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center', marginTop: 20 }}>
                      <span>You have seen all the threads.</span>
                    </p>
                  }
                >
                  {threads.map((thread, index) => (
                    <ThreadListItem key={index} thread={thread} />
                  ))}
                </InfiniteScroll>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Topic;
