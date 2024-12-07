import React, { useState, useEffect, useContext } from 'react';
import BookmarkThreadListItem from '../components/BookmarkThreadListItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import AuthContext from '../context/AuthContext';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';

const Bookmark = () => {
  let { user, token } = useContext(AuthContext);  // Assuming 'token' is stored in context
  const [threads, setThreads] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getThreads = async () => {
      try {
        if (!token) return; // Check if the token is available

        const response = await fetch(`/api/bookmark/${user['user_id']}?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
        });

        let data = await response.json();

        // update the state of threads
        setThreads(data.results);

        if (data.next === null) {
          setHasMore(false);
        }
        setPage(page + 1);
      } catch (err) {
        console.log("Unauthenticated user accesses.");
      }
    };

    if (user) {
      getThreads();
    }
  }, [page, user, token]);  // Trigger effect when page or user or token changes

  const getMoreThreads = async () => {
    const response = await fetch(`/api/bookmark/${user['user_id']}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Send token with request
      },
    });
    let data = await response.json();
    return data.results;
  };

  const fetchData = async () => {
    const moreThreads = await getMoreThreads();
    setThreads([...threads, ...moreThreads]);

    if (moreThreads.length === 0 || moreThreads.length < 10) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  return (
    <div style={{ marginTop: 100 }}>
      {user ? (
        <>
          <Container>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <div className='d-flex justify-content-between mb-3'>
                    <Typography variant="h5">Bookmarked Threads</Typography>
                  </div>
                  <Item>
                    <InfiniteScroll
                      dataLength={threads.length}
                      next={fetchData}
                      hasMore={hasMore}
                      loader={<h4 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center', marginTop: 20 }}>
                          <span>You have seen all the bookmarked threads.</span>
                        </p>
                      }
                    >
                      {threads.map((thread, index) => (
                        <BookmarkThreadListItem key={index} thread={thread} />
                      ))}
                    </InfiniteScroll>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Bookmark;
