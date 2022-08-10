import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import PostCard from '../components/PostCard';

export interface IPost {
  body: string;
  id: string;
  commentCount: number;
  comments: [];
  createdAt: string;
  likeCount: number;
  likes: [];
  username: string;
}

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Box sx={{ overflowX: loading ? 'hidden' : 'auto' }}>
      <>
        <Typography
          variant='h5'
          textAlign='center'
          paddingY={4}
          paddingRight={11}
        >
          Recent Posts
        </Typography>
        {loading ? (
          <CircularProgress
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100% !important',
              position: 'absolute !important',
              right: 44,
            }}
          />
        ) : (
          <Grid container spacing={3.5} paddingX={4}>
            {data?.getPosts.map((post: IPost, idx: number) => (
              <Grid key={post.id} item xs={4}>
                <PostCard post={post} idx={idx} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    </Box>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        createdAt
        username
      }
    }
  }
`;

export default Home;
