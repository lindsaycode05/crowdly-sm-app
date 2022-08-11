import React,{useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm'

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
  const {user} = useContext(AuthContext)

  return (
    <Box sx={{ overflowX: loading ? 'hidden' : 'auto' }}>
      <>
        <Typography
          variant='h5'
          textAlign='center'
          paddingY={4}
          paddingRight={13}
        >
          Recent Posts
        </Typography>
        {
          user && <PostForm />
        }
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
          <Grid container columnSpacing={3.5} paddingX={4}>
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
